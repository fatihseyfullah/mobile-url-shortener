"use client";

import { useState } from "react";
import { Copy, QrCode, Share2 } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

export interface UrlListItemProps {
  originalUrl: string;
  shortUrl: string;
  createdAt?: string;
}

export function UrlListItem({ originalUrl, shortUrl, createdAt }: UrlListItemProps) {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  async function handleShare() {
    if (navigator.share) {
      await navigator.share({
        title: "Kısa link",
        text: originalUrl,
        url: shortUrl,
      });
    } else {
      await handleCopy();
    }
  }

  return (
    <div className="rounded-xl border bg-white p-3 text-sm shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
      <div className="truncate text-xs text-zinc-500 dark:text-zinc-400">{originalUrl}</div>
      <div className="mt-1 flex items-center justify-between gap-2">
        <a
          href={shortUrl}
          target="_blank"
          rel="noreferrer"
          className="truncate text-sm font-medium text-blue-600 dark:text-blue-400"
        >
          {shortUrl}
        </a>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <Copy className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setShowQr(true)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <QrCode className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      {createdAt && (
        <p className="mt-1 text-[10px] text-zinc-400 dark:text-zinc-500">
          Oluşturulma: {new Date(createdAt).toLocaleString()}
        </p>
      )}

      {showQr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-xs rounded-2xl bg-white p-4 text-center dark:bg-zinc-900">
            <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">QR Kod</h2>
            <div className="mt-3 flex justify-center">
              <QRCodeCanvas value={shortUrl} size={180} />
            </div>
            <button
              type="button"
              onClick={() => setShowQr(false)}
              className="mt-4 inline-flex h-9 w-full items-center justify-center rounded-full bg-black text-xs font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
            >
              Kapat
            </button>
          </div>
        </div>
      )}

      {copied && (
        <div className="mt-1 text-[10px] text-green-600 dark:text-green-400">Panoya kopyalandı</div>
      )}
    </div>
  );
}
