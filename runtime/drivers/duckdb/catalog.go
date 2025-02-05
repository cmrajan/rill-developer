package duckdb

import (
	"context"
	"database/sql"
	"time"

	"github.com/rilldata/rill/runtime/drivers"
)

func (c *connection) FindObjects(ctx context.Context, instanceID string) []*drivers.CatalogObject {
	var res []*drivers.CatalogObject
	err := c.db.Select(&res, "SELECT * FROM rill.catalog ORDER BY name")
	if err != nil {
		panic(err)
	}
	return res
}

func (c *connection) FindObject(ctx context.Context, instanceID string, name string) (*drivers.CatalogObject, bool) {
	res := &drivers.CatalogObject{}
	err := c.db.QueryRowxContext(ctx, "SELECT * FROM rill.catalog WHERE name = ?", name).StructScan(res)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, false
		}
		panic(err)
	}
	return res, true
}

func (c *connection) CreateObject(ctx context.Context, instanceID string, obj *drivers.CatalogObject) error {
	now := time.Now()
	_, err := c.db.ExecContext(
		ctx,
		"INSERT INTO rill.catalog(name, type, sql, created_on, updated_on) VALUES (?, ?, ?, ?, ?)",
		obj.Name,
		obj.Type,
		obj.SQL,
		now,
		now,
	)
	if err != nil {
		return err
	}
	// We assign manually instead of using RETURNING because it doesn't work for timestamps in SQLite
	obj.CreatedOn = now
	obj.UpdatedOn = now
	return nil
}

func (c *connection) UpdateObject(ctx context.Context, instanceID string, obj *drivers.CatalogObject) error {
	now := time.Now()
	_, err := c.db.ExecContext(
		ctx,
		"UPDATE rill.catalog SET type = ?, sql = ?, updated_on = ? WHERE name = ?",
		obj.Type,
		obj.SQL,
		now,
		obj.Name,
	)
	if err != nil {
		return err
	}
	// We assign manually instead of using RETURNING because it doesn't work for timestamps in SQLite
	obj.UpdatedOn = now
	return nil
}

func (c *connection) DeleteObject(ctx context.Context, instanceID string, name string) error {
	_, err := c.db.ExecContext(ctx, "DELETE FROM rill.catalog WHERE name = ?", name)
	return err
}
