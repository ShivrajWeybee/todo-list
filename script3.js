'use strict';

const displayTaskContainer = document.querySelector('.display-allTask');
const mainInputTask = document.querySelector('.enter-task');
const changeTaskName = document.querySelector('.task-name-para');

const taskSort = document.querySelector('.task-sort');
taskSort.value = "def";
const taskAction = document.querySelector('.task-action');
taskAction.value = "def";

const editBtn = document.querySelectorAll('.edit-task');
const addBtn = document.querySelector('.add-task');
const searchBtn = document.querySelector('.search-task');

const allTaskBTN = document.querySelector('#allTaskBTN');
const completedTaskBTN = document.querySelector('#completedTaskBTN');
const activeTaskBTN = document.querySelector('#activeTaskBTN');

let taskId = 0;

let taskArr = [];
let completedArr = [];
let activeArr = [];

let selectedSort;

let elementId;

let isAdd = false;
let isSearch = false;
let isSort = false;
let isAll = false;
let isActive = false;
let isComplete = false;
let isSelectAll = false;

let finishText = `<strike>This task is finished</strike>`;

function insertHTML(task) {
    const html = `
        <div class="task-with-hr" id="task-and-hr-${taskId}">
            <div class="single-task flex">
                <div class="task-info flex" id="task${taskId}-info-id" onclick="thatCheckFun()">
                    <input type="checkbox" name="checkbox" id="checked-${taskId}" class="cbox">
                    <p class="task-name-para${taskId}" id="para-id-${taskId}">${task}</p>
                    <p class="finished-para${taskId} hidden" id="finish-id-${taskId}"><strike>This task is finished</strike></p>
                    <input type="text" name="task-edit" id="editable-task${taskId}" class="hidden">
                </div>
                <div class="task-update flex">
                    <button id="close-${taskId}" class="hidden" onclick="toggleEditableInput(${taskId})"><i class="fa-solid fa-square-xmark"></i></button>

                    <button id="edit-${taskId}" onclick="toggleEditableInput(${taskId})"><i class="fa-solid fa-pen-to-square"></i></button>

                    <button class="delete-${taskId}" onclick="deleteTask(${taskId})"><i class="fa-solid fa-delete-left"></i></button>
                </div>
            </div>
            <hr>
        </div>`

        displayTaskContainer.insertAdjacentHTML('afterbegin', html);
}


// ------------------------------------------------------------------------------------------
// --------------- ADD TASK ---------------
// ------------------------------------------------------------------------------------------
function addFunction(e) {
    if(isAdd && !isSearch) {
        if (e.key === 'Enter' && isAdd && !isSearch) {
            e.preventDefault();
            displayTaskContainer.classList.remove('hidden');
            if (mainInputTask.value != '' && mainInputTask.value != 0 || mainInputTask.value == '0') {
                taskArr.push(mainInputTask.value);
                insertHTML(mainInputTask.value);
            }
            else{
                alert('Enter Valid');
            }
            taskId++;

            mainInputTask.value = '';
        }
    }
}
addBtn.addEventListener('click', function() {
isAdd = true;
isSearch = false;
addBtn.classList.add('focus');
addBtn.style.backgroundColor = 'transparent';
searchBtn.classList.remove('focus');
searchBtn.style.backgroundColor = '#016fff';
mainInputTask.classList.remove('hidden');
mainInputTask.focus();
displayTaskContainer.innerHTML = '';
all();
mainInputTask.addEventListener('keydown', addFunction);
mainInputTask.removeEventListener('input', searchFunction);
});


// ------------------------------------------------------------------------------------------
// --------------- SEARCH TASK ---------------
// ------------------------------------------------------------------------------------------
let search_tearm;
function searchFunction(e) {
    if(isSearch && !isAdd) {
        if (taskArr != 0) {
                displayTaskContainer.innerHTML = '';
                search_tearm = e.target.value;
                const searchedTaskArr = taskArr.filter(item => item.includes(search_tearm));
                for(let i of searchedTaskArr) {
                    insertHTML(i);
                    if(completedArr.includes(i)) {
                        document.querySelector(`input[name="checkbox"]`).checked = true;
                    }
                }
        } else {
            alert("There's no Task!! Please add some");
        }
    }
}
searchBtn.addEventListener('click', function() {
    addBtn.classList.remove('focus');
    addBtn.style.backgroundColor = '#016fff';
    searchBtn.classList.add('focus');
    searchBtn.style.backgroundColor = 'transparent';
    isAdd = false;
    isSearch = true;
    mainInputTask.focus();
    mainInputTask.addEventListener("input", searchFunction);
    mainInputTask.removeEventListener('keydown', addFunction);
});


// ------------------------------------------------------------------------------------------
// --------------- EDIT TASK ---------------
// ------------------------------------------------------------------------------------------
function toggleEditableInput(a) {
    const secInput = document.querySelector(`#editable-task${a}`);
    const taskEditBTN = document.querySelector(`#edit-${a}`);
    const taskCloseBTN = document.querySelector(`#close-${a}`);
    const taskName = document.querySelector(`.task-name-para${a}`);

    const idex = taskArr.indexOf(taskName.textContent);

    secInput.classList.toggle("hidden");
    taskEditBTN.classList.toggle("hidden");
    taskName.classList.toggle("hidden");
    taskCloseBTN.classList.toggle("hidden");
    console.log(taskName.textContent);

    secInput.focus();
    secInput.value = taskName.textContent;

    secInput.addEventListener('keydown', function(e) {
        if(e.key === 'Enter') {
            console.log("😀");
            taskName.classList.toggle("hidden");
            taskName.textContent = secInput.value;
            secInput.classList.toggle('hidden');
            taskCloseBTN.classList.toggle("hidden");
            taskEditBTN.classList.toggle("hidden");
            taskArr[idex] = secInput.value;
        }
    });
}


// ------------------------------------------------------------------------------------------
// --------------- DELETE TASK ---------------
// ------------------------------------------------------------------------------------------
function deleteTask(a) {
    const areYouSureToDlt = confirm("Are you sure to delete this task ?");
    if(areYouSureToDlt) {
        const deleteBTN = document.querySelector(`#delete-${a}`);
        const wholeTaskWithHr = document.querySelector(`#task-and-hr-${a}`);
        const taskName = document.querySelector(`.task-name-para${a}`);
    
        const index = taskArr.indexOf(taskName.textContent);
        console.log(index);
        taskArr.splice(index, 1);
        console.log({taskArr});
        completedArr.splice(index, 1);
        console.log({completedArr});
    
        wholeTaskWithHr.parentNode.removeChild(wholeTaskWithHr);
    }
}
function dltAll(a) {
    const deleteBTN = document.querySelector(`#delete-${a}`);
    const wholeTaskWithHr = document.querySelector(`#task-and-hr-${a}`);
    const taskName = document.querySelector(`.task-name-para${a}`);
    
    const index = taskArr.indexOf(taskName.textContent);
    console.log(index);
    taskArr.splice(index, 1);
    completedArr.splice(index, 1);
    
    wholeTaskWithHr.parentNode.removeChild(wholeTaskWithHr);
}


// ------------------------------------------------------------------------------------------
// --------------- SORT TASK ---------------
// ------------------------------------------------------------------------------------------
taskSort.addEventListener('input', function() {
    isSort = true;
    displayTaskContainer.innerHTML = '';
    selectedSort = taskSort.options[taskSort.selectedIndex].value;
    console.log(selectedSort);
    const completedSet = new Set(completedArr);
    let sortedArr = [];
    if(selectedSort === 'za') {
        if(isAll) {
            const sortedArr = taskArr.sort();
            for(let i of sortedArr) {
                insertHTML(i);
                if(completedArr.includes(i)) {
                    const d = document.querySelector(`#checked-${taskId}`);
                    d.checked = true;
                    document.querySelector(`#para-id-${taskId}`).classList.add("hidden");
                    document.querySelector(`#finish-id-${taskId}`).classList.remove("hidden");
                }
            }
        }
        else if(isActive) {
            const sortedArr = activeArr.sort();
            for(let i of sortedArr) {
                insertHTML(i);
            }
        }
        else if(isComplete) {
            const sortedArr = completedArr.sort();
            for(let i of sortedArr) {
                insertHTML(i);
                const d = document.querySelector(`input[name="checkbox"]`);
                d.checked = true;
                document.querySelector(`#para-id-${taskId}`).classList.add("hidden");
                document.querySelector(`#finish-id-${taskId}`).classList.remove("hidden");
            }
        }
        else {
            const sortedArr = taskArr.sort();
            for(let i of sortedArr) {
                insertHTML(i);
                if(completedArr.includes(i)) {
                    const d = document.querySelector(`#checked-${taskId}`);
                    d.checked = true;
                    document.querySelector(`#para-id-${taskId}`).classList.add("hidden");
                    document.querySelector(`#finish-id-${taskId}`).classList.remove("hidden");
                }
            }
        }
    }
    else if(selectedSort === 'az') {
        if(isAll) {
            sortedArr = taskArr.sort((a,b) => b-a);
            for(let i of sortedArr) {
                insertHTML(i);
                if(completedArr.includes(i)) {
                    const d = document.querySelector(`#checked-${taskId}`);
                    d.checked = true;
                    document.querySelector(`#para-id-${taskId}`).classList.add("hidden");
                    document.querySelector(`#finish-id-${taskId}`).classList.remove("hidden");
                }
            }
        }
        else if (isActive) {
            sortedArr = activeArr.sort((a,b) => b-a);
            for(let i of sortedArr) {
                insertHTML(i);
            }
        }
        else if(isComplete){
            console.log(completedArr);
            const sortedArr = completedArr.sort((a,b) => b-a);
            for(let i of sortedArr) {
                insertHTML(i);
                const d = document.querySelector(`input[name="checkbox"]`);
                d.checked = true;
                document.querySelector(`#para-id-${taskId}`).classList.add("hidden");
                document.querySelector(`#finish-id-${taskId}`).classList.remove("hidden");
            }
        }
        else {
            sortedArr = taskArr.sort();
            console.log({sortedArr});
            for(let i of sortedArr.reverse()) {
                insertHTML(i);
                if(completedArr.includes(i)) {
                    const d = document.querySelector(`#checked-${taskId}`);
                    d.checked = true;
                    document.querySelector(`#para-id-${taskId}`).classList.add("hidden");
                    document.querySelector(`#finish-id-${taskId}`).classList.remove("hidden");
                }
            }
        }
    }
    else if(selectedSort === 'old') {
        if(isAll) {
            for(let i of taskArr) {
                insertHTML(i);
            }
        }
        else if (isActive) {
            for(let i of activeArr) {
                insertHTML(i);
                if(completedArr.includes(i)) {
                    const d = document.querySelector(`#checked-${taskId}`);
                    d.checked = true;
                    document.querySelector(`#para-id-${taskId}`).classList.add("hidden");
                    document.querySelector(`#finish-id-${taskId}`).classList.remove("hidden");
                }
            }
        }
        else if(isComplete){
            for(let i of completedArr) {
                insertHTML(i);
                const d = document.querySelector(`input[name="checkbox"]`);
                d.checked = true;
                document.querySelector(`#para-id-${taskId}`).classList.add("hidden");
                document.querySelector(`#finish-id-${taskId}`).classList.remove("hidden");
            }
        }
        else {
            for(let i of taskArr) {
                insertHTML(i);
            }
        }
    }
    else {
        if(isAll) {
            const sortedArr = taskArr.reverse();
            for(let i of sortedArr) {
                insertHTML(i);
                if(completedArr.includes(i)) {
                    const d = document.querySelector(`#checked-${taskId}`);
                    d.checked = true;
                    document.querySelector(`#para-id-${taskId}`).classList.add("hidden");
                    document.querySelector(`#finish-id-${taskId}`).classList.remove("hidden");
                }
            }
        }
        else if (isActive) {
            const sortedArr = activeArr.reverse();
            for(let i of sortedArr){
                insertHTML(i);
            }
        }
        else if(isComplete) {
            const sortedArr = completedArr.reverse();
            for(let i of sortedArr) {
                insertHTML(i);
                const d = document.querySelector(`input[name="checkbox"]`);
                d.checked = true;
                document.querySelector(`#para-id-${taskId}`).classList.add("hidden");
                document.querySelector(`#finish-id-${taskId}`).classList.remove("hidden");
            }
        }
        else {
            const sortedArr = taskArr.reverse();
            for(let i of sortedArr) {
                insertHTML(i);
                if(completedArr.includes(i)) {
                    const d = document.querySelector(`#checked-${taskId}`);
                    d.checked = true;
                    document.querySelector(`#para-id-${taskId}`).classList.add("hidden");
                    document.querySelector(`#finish-id-${taskId}`).classList.remove("hidden");
                }
            }
        }
    }
});


// ------------------------------------------------------------------------------------------
// --------------- TAB OF TASK ---------------
// ------------------------------------------------------------------------------------------
function completed() {
    const completedSet = new Set(completedArr);
    displayTaskContainer.innerHTML = '';
    taskId = 0;
    for(let a of completedSet) {
        insertHTML(a);
        const d = document.querySelector(`#checked-${taskId}`);
        d.checked = true;
        document.querySelector(`#para-id-${taskId}`).classList.add("hidden");
        document.querySelector(`#finish-id-${taskId}`).classList.remove("hidden");
        taskId++;
    }
    thatCheckFun();
}
completedTaskBTN.addEventListener('click', function() {
    isComplete = true;
    isActive = false;
    isAll = false;

    if(isComplete) {
        completedTaskBTN.classList.add('focus');
        completedTaskBTN.style.backgroundColor = 'transparent';
        activeTaskBTN.classList.remove('focus');
        activeTaskBTN.style.backgroundColor = '#016fff';
        allTaskBTN.classList.remove('focus');
        allTaskBTN.style.backgroundColor = '#016fff';

        completed();
    }
});

function activ() {
    displayTaskContainer.innerHTML = '';
    taskId = 0;
    activeArr = taskArr.filter(i => !completedArr.includes(i));
    for(let a of activeArr) {
        insertHTML(a);
        taskId++;
    }
    thatCheckFun();
}
activeTaskBTN.addEventListener('click', function() {
    isActive = true;
    isComplete = false;
    isAll = false;

    if(isActive) {
        activeTaskBTN.classList.add('focus');
        activeTaskBTN.style.backgroundColor = 'transparent';
        completedTaskBTN.classList.remove('focus');
        completedTaskBTN.style.backgroundColor = '#016fff';
        allTaskBTN.classList.remove('focus');
        allTaskBTN.style.backgroundColor = '#016fff';
    
        activ();
    }
})


function all() {
    taskId = 0;
    for(let a of taskArr) {
        insertHTML(a);
        if(completedArr.includes(a)) {
            const d = document.querySelector(`#checked-${taskId}`);
            d.checked = true;
            document.querySelector(`#para-id-${taskId}`).classList.add("hidden");
            document.querySelector(`#finish-id-${taskId}`).classList.remove("hidden");
        }
        taskId++;
    }
    thatCheckFun();
}

allTaskBTN.addEventListener('click', function() {
    isAll = true;
    isActive = false;
    isComplete = false;

    allTaskBTN.classList.add('focus');
    allTaskBTN.style.backgroundColor = 'transparent';
    activeTaskBTN.classList.remove('focus');
    activeTaskBTN.style.backgroundColor = '#016fff';
    completedTaskBTN.classList.remove('focus');
    completedTaskBTN.style.backgroundColor = '#016fff';

    displayTaskContainer.innerHTML = '';
    
    all();
});

function thatCheckFun() {
    taskId = 0;
    elementId = document.querySelectorAll('input[name="checkbox"]');
    console.log(elementId);
    for(let ele of elementId){
        console.log(ele);
        let index = ele.id.slice(-1);
        let an = document.querySelector(`#task-and-hr-${index}`);
        let value = document.querySelector(`#para-id-${index}`).textContent;

        ele.addEventListener('change', function() {
            if(ele.checked) {
                console.log(ele);
                completedArr.push(value);
                activeArr = activeArr.filter(i => i!=value);
                activeArr = taskArr.filter(i => !completedArr.includes(i));
                displayTaskContainer.innerHTML = '';
                if(isActive) {
                    console.log({isActive});
                    for(let i of activeArr) {
                        insertHTML(i);
                        taskId++;
                    }
                }
                else {
                    console.log({isAll});
                    for(let i of taskArr) {
                        insertHTML(i);
                        console.log({i});
                        if(completedArr.includes(i)) {
                            const d = document.querySelector(`#checked-${taskId}`);
                            d.checked = true;
                            document.querySelector(`#para-id-${taskId}`).classList.add("hidden");
                            document.querySelector(`#finish-id-${taskId}`).classList.remove("hidden");
                            // const fd = document.querySelector(`#para-id-${index}`);
                            // fd.textContent = finishText;
                        }
                        taskId++;
                    }
                    console.log({value});
                }
            }
            else {
                activeArr.push(value);
                completedArr = completedArr.filter(i => i!=value);
                displayTaskContainer.innerHTML = '';
                if(isComplete) {
                    const completedSet = new Set(completedArr);
                    for(let a of completedSet) {
                        insertHTML(a);
                        const d = document.querySelector(`#checked-${taskId}`);
                        d.checked = true;
                        document.querySelector(`#para-id-${taskId}`).classList.add("hidden");
                        document.querySelector(`#finish-id-${taskId}`).classList.remove("hidden");
                        // const fd = document.querySelector(`#para-id-${index}`);
                        // fd.textContent = finishText;
                        taskId++;
                    }
                }
                else {
                    console.log({isAll});
                    for(let a of taskArr) {
                        insertHTML(a);
                        if(completedArr.includes(a)) {
                            const d = document.querySelector(`#checked-${taskId}`);
                            d.checked = true;
                            document.querySelector(`#para-id-${taskId}`).classList.add("hidden");
                            document.querySelector(`#finish-id-${taskId}`).classList.remove("hidden");
                            // const fd = document.querySelector(`#para-id-${index}`);
                            // fd.textContent = finishText;
                        }
                        taskId++;
                    }
                } 
            }
        })
    }
}


// ------------------------------------------------------------------------------------------
// --------------- ACTIONS ON TASK ---------------
// ------------------------------------------------------------------------------------------
taskAction.addEventListener('click', function() {
    // displayTaskContainer.innerHTML = '';
    const selectedAction = taskAction.options[taskAction.selectedIndex].value;
    console.log(selectedAction);
    const d = document.querySelectorAll(`input[name="checkbox"]`);

    if(selectedAction === 'selectall') {
        isSelectAll = true;
        for(let i of d) {

            let index = i.id.slice(-1);
            let an = document.querySelector(`#task-and-hr-${index}`);
            let value = document.querySelector(`#para-id-${index}`).textContent;

            i.checked = true;

            document.querySelector(`#para-id-${index}`).classList.add("hidden");
            document.querySelector(`#finish-id-${index}`).classList.remove("hidden");
            
            activeArr = taskArr.filter(i => i != value);
            completedArr = taskArr.filter(i => i = value);
        }
    }
    else if (selectedAction === 'unselectall') {
        for(let i of d) {

            let index = i.id.slice(-1);
            let an = document.querySelector(`#task-and-hr-${index}`);
            let value = document.querySelector(`#para-id-${index}`).textContent;

            i.checked = false;

            document.querySelector(`#para-id-${index}`).classList.remove("hidden");
            document.querySelector(`#finish-id-${index}`).classList.add("hidden");

            activeArr = taskArr;
            console.log({activeArr});
            completedArr = [];
            console.log({completedArr});
        }
    }
    else if (selectedAction === 'dlt') {
        // if()
        const dltAllSure = confirm("Do you really want delete all the task ?");
        if(dltAllSure) {
            for(let i of d) {
                let index = i.id.slice(-1);
                let an = document.querySelector(`#task-and-hr-${index}`);
                let value = document.querySelector(`#para-id-${index}`).textContent;
    
                if(i.checked) {
                    dltAll(index);
                }
            }
        }
    }
    taskAction.value = "def";
});