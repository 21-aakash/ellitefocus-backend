

-- Insert initial users
INSERT INTO users (username, email, password, created_at, updated_at) 
VALUES ('admin', 'admin@example.com', 'admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert initial todos for the admin user
INSERT INTO todo_items (description, is_complete, created_at, updated_at, user_id) 
VALUES 
    ('Buy groceries', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, (SELECT id FROM users WHERE username='admin')),
    ('Complete homework', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, (SELECT id FROM users WHERE username='admin')),
    ('Call mom', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, (SELECT id FROM users WHERE username='admin'));
