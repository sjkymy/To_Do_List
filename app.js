const wrapper = document.querySelector('.wrapper');
const inpTodo = wrapper.querySelector('#inp-todo');
const btnSave = wrapper.querySelector('.btn-save');
const todoList = wrapper.querySelector('.todo-list');
const downloadBtn = document.createElement('button');
downloadBtn.textContent = '다운로드'
wrapper.appendChild(downloadBtn);


// 로컬스토리지에서 taskList라는 키값을 가진 객체를 가져온다.
// 내용이 없으면 빈 배열을 가져온다.
const tasks = JSON.parse(localStorage.getItem('taskList')) || [];

btnSave.addEventListener('click', createTodo)

function createTodo() {
    // console.log('저장 버튼 누름');

    const inpTodoValue = inpTodo.value;
    if (inpTodoValue) {
        const objTask = {
            val: inpTodoValue,
            checked: false
        };

        // 로컬스토리지에서 가져온 tasks의 키 taskList에 밸류 값으로 붙여준다.
        tasks.push(objTask);

        // 입력한 내용 ul에 붙이기
        listUp(inpTodoValue, false)

        // 로컬스토리지에 저장하기
        saveTask()

        // ul에 리스트가 있으면 다운로드 버튼 생성 및 클릭하면 다운로드
        showDownloadBtn()
    }
}


function listUp(val, complete) {
    const li = document.createElement('li')
    todoList.appendChild(li)
    li.textContent = val

    // ul로 옮겨지면 인풋창은 초기화시키기.
    inpTodo.value = '';

    // 이 부분 안하면 완료선 로컬스토리지에 저장안됨.
    if (complete) {
        li.classList.add('done')
    }

    li.addEventListener('click', () => {
        li.classList.toggle('done')
    })

    const removeBtn = document.createElement('button');
    removeBtn.innerHTML ='<i class="fa-solid fa-trash"></i>';
    li.appendChild(removeBtn);

    removeBtn.addEventListener('click', () => {
        li.remove()
    })
}

// 로컬스토리지에 저장
function saveTask() {
    localStorage.setItem('taskList', JSON.stringify(tasks));
}

function showDownloadBtn() {
    const currnetLi = todoList.querySelectorAll(li)
    if (currnetLi.length > 0) {
        downloadBtn.style.display = 'block'
    } else {
        downloadBtn.style.display = 'none'
    }
}