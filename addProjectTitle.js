const containerFormAddProject = document.querySelector('.container-form-add-project');
const input = document.querySelector('.form-add-project input');
const buttonCalcel = document.querySelector('.container-buttons #button-calcel');
const buttonCriate = document.querySelector('.container-buttons #button-criate');
const formButtons = document.querySelectorAll('.container-buttons button');
const asideContainerProjects = document.querySelector('.aside-container-projects');

export const handleAddProjectToSidebar = () => {
    formButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
        });
    });
    buttonCalcel.addEventListener('click', () => {
        input.value = '';
        containerFormAddProject.style.display = 'none';
    });

    buttonCriate.addEventListener('click', () => {
        if(input.value.length > 0) {
            const buttonProjectTitle = document.createElement('button');
            buttonProjectTitle.textContent = input.value;
            buttonProjectTitle.id = input.value.replace(/\s/g, '-');

            asideContainerProjects.appendChild(buttonProjectTitle);
            input.value = '';
            containerFormAddProject.style.display = 'none';
        }
        else{
            alert('Por favor, Digite o nome do projeto!');
        };
    })
};