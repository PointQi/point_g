CREATE TABLE role_types (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    identifier INT NOT NULL,
    enabled BOOLEAN NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);