CREATE TABLE pending_contributions (
  id VARCHAR(255) PRIMARY KEY,
  submitted_name VARCHAR(255) NOT NULL,
  suggested_mapping VARCHAR(255),
  user_notes TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  reviewer_notes TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
