import 'module-alias/register';

import { ServerApp } from './application/app';

(async (): Promise<void> => {
  await runApplication();
})();

async function runApplication(): Promise<void> {
  const serverApplication: ServerApp = ServerApp.new();
  await serverApplication.run();
}