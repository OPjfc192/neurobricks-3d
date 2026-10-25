import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

interface TauriConfiguration {
  tauri?: {
    allowlist?: {
      dialog?: Record<string, unknown>;
      fs?: Record<string, unknown>;
      shell?: Record<string, unknown>;
    };
    security?: {
      csp?: string | null;
    };
  };
}

function readRepositoryFile(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), 'utf8');
}

describe('Tauri production security configuration', () => {
  it('enables a restrictive CSP instead of shipping without browser isolation', () => {
    const config = JSON.parse(readRepositoryFile('src-tauri/tauri.conf.json')) as TauriConfiguration;
    const csp = config.tauri?.security?.csp;

    expect(typeof csp).toBe('string');
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("script-src 'self'");
    expect(csp).not.toContain("script-src 'unsafe-inline'");
    expect(csp).not.toContain('*');
  });

  it('does not expose unused shell execution or filesystem read APIs to the webview', () => {
    const config = JSON.parse(readRepositoryFile('src-tauri/tauri.conf.json')) as TauriConfiguration;

    expect(config.tauri?.allowlist?.shell).toBeUndefined();
    expect(config.tauri?.allowlist?.fs?.readFile).toBeUndefined();
    expect(config.tauri?.allowlist?.fs?.scope).toEqual([]);
    expect(config.tauri?.allowlist?.dialog?.save).toBe(true);

    const cargoManifest = readRepositoryFile('src-tauri/Cargo.toml');
    expect(cargoManifest).not.toContain('shell-execute');
    expect(cargoManifest).not.toContain('shell-open');
    expect(cargoManifest).not.toContain('fs-read-file');
  });
});
