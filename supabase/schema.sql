-- Create a table for documents
create table if not exists documents (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  original_text text not null,
  humanized_text text not null,
  mode text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table documents enable row level security;

-- Create a policy for users to insert their own documents
create policy "Users can insert their own documents"
  on documents for insert
  with check (auth.uid() = user_id);

-- Create a policy for users to view their own documents
create policy "Users can view their own documents"
  on documents for select
  using (auth.uid() = user_id);

-- Create a policy for users to update their own documents
create policy "Users can update their own documents"
  on documents for update
  using (auth.uid() = user_id);

-- Create a policy for users to delete their own documents
create policy "Users can delete their own documents"
  on documents for delete
  using (auth.uid() = user_id);
