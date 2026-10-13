// Isolated from MINATAVR strength.html; demo copy replaces project-specific content.
const items = [
  {title:'Персонально',description:'Формат для задач, требующих индивидуального внимания.',who:'Для тех, кому нужен персональный маршрут.',includes:'Анализ задачи, план и регулярная обратная связь.',how:'Встречи и корректировки по согласованному графику.'},
  {title:'Команда',description:'Совместная работа с понятным распределением ролей.',who:'Для небольших групп.',includes:'Общие сессии и индивидуальные рекомендации.',how:'Совместные встречи по расписанию.'},
  {title:'Онлайн',description:'Удалённое взаимодействие без привязки к месту.',who:'Для участников из разных городов.',includes:'Созвоны, материалы и обратная связь.',how:'В удобном онлайн-формате.'},
  {title:'План',description:'Последовательная система действий.',who:'Для самостоятельной работы.',includes:'Этапы, контрольные точки и рекомендации.',how:'В собственном темпе.'},
  {title:'Консультация',description:'Разбор запроса и возможных решений.',who:'Для тех, кто хочет определить следующий шаг.',includes:'Диагностика запроса и практические рекомендации.',how:'Одна встреча с возможностью продолжения.'}
];
const dialog = document.querySelector('.modal');
const closeButton = dialog.querySelector('.modal__close');
let lastTrigger = null;
function closeDialog(){ dialog.close(); }
function lockPageScroll(){ document.documentElement.classList.add('modal-open'); }
function unlockPageScroll(){ document.documentElement.classList.remove('modal-open'); }
document.querySelectorAll('[data-item]').forEach(button=>{
  button.addEventListener('click',()=>{
    const item=items[Number(button.dataset.item)];
    if(!item)return;
    lastTrigger=button;
    for(const [id,value] of Object.entries({modalTitle:item.title,modalDescription:item.description,modalWho:item.who,modalIncludes:item.includes,modalHow:item.how}))document.getElementById(id).textContent=value;
    lockPageScroll();
    dialog.showModal();
    closeButton.focus();
  });
});
closeButton.addEventListener('click',closeDialog);
dialog.querySelector('.modal__done').addEventListener('click',closeDialog);
dialog.addEventListener('click',event=>{if(event.target===dialog)closeDialog();});
dialog.addEventListener('close',()=>{
  unlockPageScroll();
  lastTrigger?.focus();
});
