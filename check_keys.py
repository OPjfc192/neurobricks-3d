import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

with open('src-tauri/src/commands/training.rs', encoding='utf-8') as f:
    content = f.read()

i = content.find('"progress" | "epoch_end"')
print(repr(content[i-80:i+320]))
