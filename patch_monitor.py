# -*- coding: utf-8 -*-
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

with open('src/components/training/TrainMonitor.tsx', encoding='utf-8') as f:
    content = f.read()

old_block = """          <button
            onClick={handleReset}
            style={{
              marginTop: '8px',
              padding: '6px 16px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 600,
            }}
          >
            🔄 重置
          </button>
        </div>
      )}"""

new_block = """          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            {errorKind && lastTrainConfig && (
              <button
                onClick={handleRestartTraining}
                data-testid="restart-train-btn"
                style={{
                  padding: '6px 16px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: 600,
                }}
              >
                🔄 重新开始训练
              </button>
            )}
            <button
              onClick={handleReset}
              style={{
                padding: '6px 16px',
                backgroundColor: '#475569',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: 600,
              }}
            >
              重置
            </button>
          </div>
        </div>
      )}"""

if old_block in content:
    content = content.replace(old_block, new_block)
    content = content.replace('❌ 训练出错\n          </div>', "{errorKind === 'hung' ? '⏱ 训练进程挂起' : '❌ 训练出错'}\n          </div>")
    with open('src/components/training/TrainMonitor.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print('替换成功')
else:
    print('未找到旧块')
