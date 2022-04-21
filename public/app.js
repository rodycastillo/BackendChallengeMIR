const container = document.getElementById("container");
const changeColor = () => {
  setTimeout(() => {
    container.classList.remove("container");
    container.classList.add("black");
  }, 3000);
};
changeColor();
