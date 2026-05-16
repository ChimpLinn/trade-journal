-- 在 Supabase SQL Editor 中执行
alter table trades
  add column if not exists risk_level text
  check (risk_level in ('high', 'medium', 'low'));
