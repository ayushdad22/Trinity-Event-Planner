# Base image with Python 3.12
FROM python:3.12-slim

# Install system deps
RUN apt-get update && apt-get install -y curl unzip nodejs npm

# Install Bun (same as flake)
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"

# Set working directory
WORKDIR /app

# Copy project
COPY . .

# --- Backend setup (matches shellHook) ---
RUN python -m venv .venv
ENV PATH="/app/.venv/bin:$PATH"

RUN pip install --upgrade pip

# Install Python deps if present
RUN if [ -f requirements.txt ]; then pip install -r requirements.txt; fi

# --- Frontend setup (matches flake frontend package) ---
WORKDIR /app/frontend
RUN bun install

# Back to root
WORKDIR /app

# Expose ports
EXPOSE 5000 3000

# Run both services (like your shell instructions)
CMD bash -c "\
  source .venv/bin/activate && \
  python backend/app.py & \
  cd frontend && bun run dev\
"