/*
# Study progress tables (single-tenant, no auth)

1. New Tables
- `study_sessions`: one row per finished practice session.
  - `id` (uuid, primary key)
  - `unit` (integer 1-4, the unit practiced)
  - `mode` (text: 'practica' | 'examen' | 'abiertas')
  - `total_questions` (integer)
  - `correct_count` (integer)
  - `score` (numeric, 0-5 scale)
  - `created_at` (timestamp)
- `open_answers`: saved answers for open questions with model answers.
  - `id` (uuid, primary key)
  - `question_id` (text, e.g. 'ab-u1-1')
  - `unit` (integer)
  - `answer` (text, the student's written answer)
  - `created_at` (timestamp)
- `wrong_questions`: question ids the student got wrong, for the review list.
  - `id` (uuid, primary key)
  - `question_id` (text)
  - `created_at` (timestamp)
2. Security
- Enable RLS on all three tables.
- Grant SELECT/INSERT/DELETE to anon + authenticated (no sign-in in this app).
- Policies allow all rows to anon + authenticated because data is intentionally shared.
*/

CREATE TABLE IF NOT EXISTS study_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  unit integer NOT NULL,
  mode text NOT NULL DEFAULT 'practica',
  total_questions integer NOT NULL,
  correct_count integer NOT NULL,
  score numeric NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS open_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id text NOT NULL,
  unit integer NOT NULL,
  answer text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS wrong_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE open_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE wrong_questions ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, DELETE ON study_sessions TO anon, authenticated;
GRANT SELECT, INSERT, DELETE ON open_answers TO anon, authenticated;
GRANT SELECT, DELETE ON wrong_questions TO anon, authenticated;

DROP POLICY IF EXISTS "sessions_select" ON study_sessions;
CREATE POLICY "sessions_select" ON study_sessions FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "sessions_insert" ON study_sessions;
CREATE POLICY "sessions_insert" ON study_sessions FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "sessions_delete" ON study_sessions;
CREATE POLICY "sessions_delete" ON study_sessions FOR DELETE TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "answers_select" ON open_answers;
CREATE POLICY "answers_select" ON open_answers FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "answers_insert" ON open_answers;
CREATE POLICY "answers_insert" ON open_answers FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "wrong_select" ON wrong_questions;
CREATE POLICY "wrong_select" ON wrong_questions FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "wrong_insert" ON wrong_questions;
CREATE POLICY "wrong_insert" ON wrong_questions FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "wrong_delete" ON wrong_questions;
CREATE POLICY "wrong_delete" ON wrong_questions FOR DELETE TO anon, authenticated USING (true);
