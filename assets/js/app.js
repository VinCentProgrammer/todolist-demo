
const LIST_TASK = 'LIST_TASK';

const saveData = (data) => {
    localStorage.setItem(LIST_TASK, JSON.stringify(data));
}


const loadData = () => {
    let data;
    data = JSON.parse(localStorage.getItem(LIST_TASK));
    data = data ? data : [];
    return data;
}


const addTask = taskItem => {
    let data = loadData();
    data.push(taskItem);
    saveData(data);
}


const bodyTask = document.querySelector('ul');


const renderTasks = () => {
    let cntTaskComplete = 0, data = loadData();
    let htmlRender = data.map((element, index) => {
        if(element.status)
            ++cntTaskComplete;
        return `
            <li>
                <div class="item-todo">
                    <span onclick = "markTaskComplete(this, ${index})" status = "${element.status}">${element.task}</span>
                    <div class="action-todo">
                        <div class="update-todo">
                            <i onclick = "pushTask(${index}, '${element.task}')" class="fa-regular fa-pen-to-square"></i>
                        </div>
                        <div class="delete-todo">
                            <i onclick = "deleteTask(${index})" class="fa-regular fa-trash-can"></i>
                        </div>
                    </div>
                </div>
            </li>
        `;
    });
    bodyTask.innerHTML = htmlRender.join('');
    const resultComplete = document.querySelector('.result-complete');
    resultComplete.innerHTML = cntTaskComplete ? `📖👍Yeah, <b class = "text-success">${cntTaskComplete} </b> task completed !!!💯😊`: '';
}


renderTasks();


const formsAddTask = document.forms.add_task;


const markTaskComplete = (element, index) => {
    let data = loadData();
    data[index].status = data[index].status ? false : true;
    element.setAttribute("status", data[index].status);
    saveData(data);
    renderTasks();
}


const deleteTask = index => {
    let data = loadData();
    let delete_confirm = confirm(`Do you want to delete ${data[index].task} task?`);
    if(!delete_confirm) return false;
    data.splice(index, 1);
    saveData(data);
    renderTasks();
}

const renderNoteMini = () => {
    const noteMini = document.querySelector('.mini-tip');
    noteMini.innerText = `🔔 Enter ESC to exit edit task!`;
}


const pushTask = (index, task) => {
    const inputTask = formsAddTask.firstElementChild;
    const btnAddTask = formsAddTask.lastElementChild;
    inputTask.value = task;
    inputTask.setAttribute('index', index);
    btnAddTask.innerText = '✏️EDIT TASK';

    renderNoteMini();
}


const editTask = (task, index) => {
    let data = loadData();
    data[index].task = task;
    const btnAddTask = formsAddTask.lastElementChild;
    const inputTask = formsAddTask.firstElementChild;
    btnAddTask.innerText = '➕ADD TASK';
    inputTask.removeAttribute('index');
    saveData(data);
    renderTasks();
}


formsAddTask.addEventListener('submit', (e) => {
    if(task_name.value == ''){
        alert('Enter your task, please😑');
        return false;
    }
    let index = task_name.getAttribute('index');
    if(index){
        editTask(task_name.value, index);
        const noteMini = document.querySelector('.mini-tip');
        noteMini.innerText = ``;
    }else{
        let taskItem = {
            task: task_name.value,
            status: false
        }
        addTask(taskItem);
    }
    task_name.value = '';
    renderTasks();
    e.preventDefault();
})


//create typing ESC to exit edit task

window.addEventListener('keyup', (e) => {
    if(e.which == 27){
        const btnAddTask = formsAddTask.lastElementChild;
        const inputTask = formsAddTask.firstElementChild;
        btnAddTask.innerText = '➕ADD TASK';
        inputTask.removeAttribute('index');
        inputTask.value = '';
        const noteMini = document.querySelector('.mini-tip');
        noteMini.innerText = ``;
    }
})
