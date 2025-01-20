export const openBrowserTabWithContent = (data: string) => {
  const tab = window.open();

  if (tab) {
    const document = tab.document;
    document.open();
    document.write(data);
    document.close();
  } else {
    alert("Pop-up blocked! Please allow pop-ups for this website.");
  }
};
