import { supabase, isSupabaseConfigured } from './supabase';

export interface SessionRecord {
  unit: number;
  mode: 'practica' | 'examen' | 'abiertas';
  totalQuestions: number;
  correctCount: number;
  score: number;
}

export interface SessionRow extends SessionRecord {
  created_at: string;
}

export async function saveSession(record: SessionRecord): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;
  const { error } = await supabase.from('study_sessions').insert({
    unit: record.unit,
    mode: record.mode,
    total_questions: record.totalQuestions,
    correct_count: record.correctCount,
    score: record.score,
  });
  if (error) throw error;
}

export async function loadSessions(): Promise<SessionRow[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase
    .from('study_sessions')
    .select('unit, mode, total_questions, correct_count, score, created_at')
    .order('created_at', { ascending: false })
    .limit(20);
  if (error) throw error;
  return (data ?? []).map((r: Record<string, unknown>) => ({
    unit: Number(r.unit),
    mode: String(r.mode) as SessionRecord['mode'],
    totalQuestions: Number(r.total_questions),
    correctCount: Number(r.correct_count),
    score: Number(r.score),
    created_at: String(r.created_at),
  }));
}

export async function saveOpenAnswer(
  questionId: string,
  unit: number,
  answer: string
): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;
  const { error } = await supabase.from('open_answers').insert({
    question_id: questionId,
    unit,
    answer,
  });
  if (error) throw error;
}

export async function saveWrongQuestion(questionId: string): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;
  const { error } = await supabase.from('wrong_questions').insert({
    question_id: questionId,
  });
  if (error) throw error;
}

export async function loadWrongQuestionIds(): Promise<string[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase
    .from('wrong_questions')
    .select('question_id')
    .limit(500);
  if (error) throw error;
  return Array.from(new Set((data ?? []).map((r) => String(r.question_id))));
}

export async function clearWrongQuestions(): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;
  const { error } = await supabase.from('wrong_questions').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (error) throw error;
}
