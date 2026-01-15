const containerFormAddProject = document.querySelector('.container-form-add-project');
const buttonAddProjectSidebar = document.querySelector('aside #button-add-project-sidebar');
const asideContainerProjects = document.querySelector('.aside-container-projects')


export const handleDisplayForm = () => {
    buttonAddProjectSidebar.addEventListener('click', () => {
        if(asideContainerProjects.children.length >= 8) {
            alert('Lamentamos, voce atingiu o limite e agora voce nao pode criar mais projetos')
        }
        else{
            containerFormAddProject.style.display = 'flex';
        }
    });
};