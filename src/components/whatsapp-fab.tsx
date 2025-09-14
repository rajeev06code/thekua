import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function WhatsAppFAB() {
  return (
    <Button
      asChild
      size="icon"
      className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600"
    >
      <Link href="https://wa.me/910000000000" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-message-circle"
        >
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
      </Link>
    </Button>
  );
}
