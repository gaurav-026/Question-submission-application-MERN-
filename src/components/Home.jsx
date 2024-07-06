import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';

//form questions
const questions = [
  {
    id: "1",
    type: 'single',
    question: 'Which language is primarily used for web development?',
    options: ['Python', 'Java', 'HTML', 'C++'],
  },
  {
    id: "2",
    type: 'single',
    question: 'Who is known as the father of computer science?',
    options: ['Alan Turing', 'Bill Gates', 'Steve Jobs', 'Tim Berners-Lee'],
  },
  {
    id: "3",
    type: 'multiple',
    question: 'Which of the following are programming languages?',
    options: ['HTML', 'Java', 'Python', 'CSS'],
  },
  {
    id: "4",
    type: 'multiple',
    question: 'Which of the following are not programming languages?',
    options: ['HTML', 'Java', 'Google Chrome', 'Cyber Security'],
  },
  {
    id: "5",
    type: "single",
    question: 'Which data structure operates on a Last In, First Out (LIFO) principle?',
    options: ['Queue', 'Stack', 'Array', "Linked List"],
  },
  {
    id: "6",
    type: "single",
    question: 'What does CSS stand for?',
    options: ['Computer Style Sheets', 'Creative Style Sheets', 'Cascading Style Sheets', "Colorful Style Sheets"],
  },
  {
    id: "7",
    type: "single",
    question: 'Which of the following is a front-end JavaScript framework?',
    options: ['Django', 'React', 'Flask', "Laravel"],
  },
  {
    id: "8",
    type: "multiple",
    question: 'Which of the following are sorting algorithms? (Select all that apply)',
    options: ['Bubble Sort', 'Binary Search', 'Quick Sort', "Merge Sort"],
  },
  {
    id: "9",
    type: "multiple",
    question: 'Which of the following are types of databases? (Select all that apply)',
    options: ['SQL', 'NoSQL', 'MongoDb', "Oracle"],
  },
  {
    id: "10",
    type: "multiple",
    question: 'Which tools are commonly used for UI/UX design? (Select all that apply)',
    options: ['Figma', 'Sketch', 'Visual Studio Code', "Adobe XD"],
  },

];


const Home = () => {

  //To store the responses of all the questions
  const [formData, setFormData] = useState({});
  //to store the values of checkboxes data
  const [selectedOptions, setSelectedOptions] = useState([]);
  //to track drag and drop questions
  const [formQuestions, setFormQuestions] = useState(questions);
  //for navigating page
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data is", JSON.stringify(formData));
    //save in object form aur pass kr do 
    const object = { formData };
    // console.log(object);
    const response = await fetch(`https://question-submission-application-mern.onrender.com/api/v1/postResponses`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ object })
      });
    console.log(response);
    console.log("Data is posted successfully");
    navigate("/successful");

  }

  //handleChangeRadio function for radio input
  const handleChangeRadio = (event) => {
    //response store in the form 
    const { id, value } = event.target;
    // console.log("Selected the radio value", id, value);
    //set the repsonse of every question by id
    setFormData((prevValues) => ({ ...prevValues, [id]: value }));

  }

  //handleChangeCheckbox function to for checkbox input
  const handleChangeCheckbox = (event) => {
    //destructuring
    const { name, checked, id } = event.target;
    setSelectedOptions((prevSelectedOptions) => {
      //find if corresponding array is available already pointing by id or not... if not initialize the empty array
      const optionsForQuestion = prevSelectedOptions[id] || [];
      return {
        //if check is true, then copy the previous response and add new response ..if not remove it from the array
        ...prevSelectedOptions,
        [id]: checked
          ? [...optionsForQuestion, name]
          : optionsForQuestion.filter((option) => option !== name)
      };
    });

  };
  useEffect(() => {
    setFormData((prevValues) => ({ ...prevValues, ...selectedOptions }));
  }, [selectedOptions]);


  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(formQuestions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFormQuestions(items);
  };
  return (
    <>
      <br />
      <br />
      <h3>Answer the following questions. All the questions are compulsory to attempt</h3>
      <form onSubmit={handleSubmit}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="questions">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {formQuestions.map((q, index) => (
                  <Draggable key={q.id} draggableId={q.id.toString()} index={index}>
                    {(provided) => (
                      <div className='questionCard'
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div>
                          <p>Question: {q.question}</p>

                          {q.type === 'single' ? (
                            q.options.map((option) => (

                              <div key={option}>
                                <br />
                                <input
                                  type="radio"
                                  id={q.id}
                                  name={q.question}
                                  value={option}
                                  onChange={handleChangeRadio}
                                />
                                <label htmlFor={option}>&nbsp;&nbsp;&nbsp;{option}</label>
                              </div>
                            ))
                          ) : (
                            q.options.map((option) => (
                              <div key={option}>
                                <br />
                                <input
                                  type="checkbox"
                                  id={q.id}
                                  name={option}
                                  onChange={handleChangeCheckbox}
                                  checked={selectedOptions[q.id]?.includes(option) || false}
                                />
                                <label htmlFor={option}>&nbsp;&nbsp;&nbsp;&nbsp;{option}</label>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <button type="submit" className='button'><b>Submit</b></button>
      </form>

    </>
  )
}

export default Home


