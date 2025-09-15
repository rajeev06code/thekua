
import { Logo } from './icons';

export function Loader() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="animate-pulse">
        <Logo />
      </div>
    </div>
  );
}
