
export async function printHtml(html: string) {
  const iframe = addIFrameToDocument();
  try {
    await printHTMLWithinIframe(iframe, html);
  } finally {
    removeIframe(iframe);
  }
}

function addIFrameToDocument() {
  const iframe = document.createElement("iframe");
  document.body.appendChild(iframe);
  return iframe;
}

async function printHTMLWithinIframe(iframe: HTMLIFrameElement, html: string) {
  await loadHtml(iframe, html);
  assertNotNull(iframe.contentWindow)
  await printWindow(iframe.contentWindow);
}

function loadHtml(iframe: HTMLIFrameElement, html: string): Promise<void> {
  return new Promise<void>((resolve) => {
    iframe.addEventListener("load", () => {
      resolve();
    });
    iframe.srcdoc = html;
  });
}

function assertNotNull(contentWindow: WindowProxy | null): asserts contentWindow is WindowProxy {
  if (contentWindow == null) {
    throw new Error(
        "iframe contentwindow does not exist. This should never happen"
    );
  }
}

function printWindow(contentWindow: Window): Promise<void> {
  return new Promise<void>((resolve) => {
    contentWindow?.print();
    contentWindow?.addEventListener("afterprint", () => {
      resolve();
    });
  });
}

function removeIframe(iframe: HTMLIFrameElement) {
  document.body.removeChild(iframe);
}
