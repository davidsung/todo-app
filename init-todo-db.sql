CREATE TABLE todos(
    id BIGSERIAL PRIMARY KEY,
    complete BOOLEAN NOT NULL DEFAULT FALSE,
    due TIMESTAMPTZ,
    task TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);