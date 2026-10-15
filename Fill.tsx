import { isPlaceholder } from "@/lib/links";

/**
 * Выводит текст из конфига. Если в нём остался плейсхолдер [в скобках],
 * подсвечивает его — так незаполненные места сразу видны на сайте.
 */
export function Fill({ children }: { children: string }) {
  if (!isPlaceholder(children)) return <>{children}</>;
  const parts = children.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) =>
        isPlaceholder(part) ? (
          <span key={i} className="placeholder-mark" title="Заполните в src/config/site.config.ts">
            {part.slice(1, -1)}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
