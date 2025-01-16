function validateAnimalForm(form){
    let isValid = true;

    ['name','breed','legs','eyes','sound'].forEach((fieldName)=>{
        const field = form[fieldName];
        const errorMessage = field.nextElementSibling;
        if (!field.value.trim()||(['legs','eyes'].includes(fieldName)&& parseInt(field.value)<=0))
        {
            errorMessage.textContent = `Please provide a valid ${fieldName}.`;
            errorMessage.classList.remove('d-none');
            field.classList.add('is-invalid');
            isValid=false;
            

        }else{
            errorMessage.textContent= '';
            errorMessage.classList.add('d-none');
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        }
    });

    return isValid;
}

function submitAnimalForm(event)
{
    event.preventDefault();

    const form = event.target;
    const isValid = validateAnimalForm(form);

    if(isValid)
    {
        const animal= {
            name:form.name.value.trim(),
            breed:form.breed.value.trim(),
            legs:parseInt(form.legs.value),
            eyes:parseInt(form.eyes.value),
            sound:form.sound.value.trim(),
        };
        console.log('Animal saved:',animal);

        form.reset();
        ['name','breed','legs','eyes','sound'].forEach((fieldName)=>
        {
            form[filedName].classList.remove('is-valid','is-invalid');
            form[fieldName].nextElementsSibling.ClassList.add('d-none');
        });
    }else{
        const messageBox = document.getElementById('message-box');
        messageBox.textContent = 'Please fix the errors';
        messageBox.classList.remove('d-none');
    }
}

const animalForm = document.getElementById('animal-form');
animalForm.addEventListener('submit',submitAnimalForm);