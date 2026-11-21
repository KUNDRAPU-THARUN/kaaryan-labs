'use client';
import { MessageCircle } from 'lucide-react';
import { COMPANY } from '@/lib/content';

export function WhatsAppButton() {
  return (
    <a
      href={COMPANY.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat with KAARYAN LABS on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <span className="whatsapp-icon-wrapper">
        <MessageCircle size={24} fill="currentColor" strokeWidth={1.5} />
      </span>
      <span className="whatsapp-label">Chat with us</span>
    </a>
  );
}
