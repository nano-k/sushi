// ◆ 1段目：貫タイトルをクリック → ヒント1〜3のタイトルが出現
document.querySelectorAll('.hint-title').forEach(title => {
  title.addEventListener('click', () => {
    const list = title.nextElementSibling;
    list.style.display = (list.style.display === 'block') ? 'none' : 'block';
  });
});


// ◆ 2段目：ヒント1〜3のタイトルをクリック → 本文が出現
document.querySelectorAll('.hint-subtitle').forEach(sub => {
  sub.addEventListener('click', () => {
    const detail = sub.nextElementSibling;
    detail.style.display = (detail.style.display === 'block') ? 'none' : 'block';
  });
});
