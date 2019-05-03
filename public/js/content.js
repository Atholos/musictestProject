'use strict';

const main = document.getElementById('main');

const showPics= () => {
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }



};

//profile



const profileHTML = () =>{
  console.log('I was pressed: '+main);
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }

  //USERNAME
  const user = document.createElement('H1');
  user.innerText = 'Username';

  //USERNAME DESCRIPTION
  const description = document.createElement('H1');
  description.innerText = 'aofylbauieyrgf leuryglbiuaebrasdasfeafaefaefgc ida.fliyhaöfd';

  //Create form-container
  const div = document.createElement('div');
  div.setAttribute('class','form-container');
  div.setAttribute('id','form-container');

  //Add Image text AI
  const AI = document.createElement('H3');
  AI.innerText = 'Add File';

  //form for form-container
  const form = document.createElement('form');
  form.setAttribute('action','/upload');
  form.setAttribute('id', 'mediaform');

  //Category input
  const category = document.createElement('input');
  category.setAttribute('type', 'text');
  category.setAttribute('name', 'category');
  category.setAttribute('placeholder', 'Category');


  //Title of the add image
  const title = document.createElement('input');
  title.setAttribute('type', 'text');
  title.setAttribute('name', 'title');
  title.setAttribute('placeholder', 'Title');

  const textarea = document.createElement('textarea');
  title.setAttribute('name', 'details');
  title.setAttribute('placeholder', 'Details');

  const label = document.createElement('label');
  label.setAttribute('class','button');
  label.innerText = 'Select Image';

  const inputImage = document.createElement('input');
  inputImage.setAttribute('type','file');
  inputImage.setAttribute('name','my-image');
  inputImage.setAttribute('accept','image/*');

  const submitButton = document.createElement('button');
  submitButton.setAttribute('type','submit');
  submitButton.innerText = 'Submit';


  main.appendChild(user);
  main.appendChild(description);

  main.appendChild(div);
  div.appendChild(AI);
  div.appendChild(form);
  form.appendChild(category);
  form.appendChild(title);
  form.appendChild(textarea);
  form.appendChild(label);
  label.appendChild(inputImage);
  form.appendChild(submitButton);

};