"use client";

export default function TestComponent() {
  const sendQuestion = async () => {
    const questionData = {
      toUsername: "21cash",
      questionText: "How are you 21cash?",
    };

    const response = await fetch("/api/ask-question", {
      method: "POST",
      body: JSON.stringify(questionData),
    });

    const resData = await response.json();
    console.log(resData);
  };

  const answerQuestion = async () => {
    const answerData = {
      questionId: 1,
      answerText: "Im Fine. What About Ya ?",
    };

    const response = await fetch("/api/answer-question", {
      method: "POST",
      body: JSON.stringify(answerData),
    });

    console.log(response);
  };

  const updateBio = async () => {
    const response = await fetch("/api/update-bio", {
      method: "POST",
      body: JSON.stringify({ bioText: "SWE @Google, Google SWE Intern '25" }),
    });

    console.log(response);
  };

  return (
    <div>
      <button onClick={sendQuestion}> Send Question </button>;
      <br />
      <button onClick={answerQuestion}> Send Answer</button>;
      <br />
      <button onClick={updateBio}> Update Bio</button>;
    </div>
  );
}
