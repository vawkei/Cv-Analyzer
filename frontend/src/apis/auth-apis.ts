const BASE_URL = "http://localhost:5000/api/v1/auth";

export const register = async (userData: any) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    console.log("data:", data);
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    console.log("register message:", message);
    throw error;
  }
};

export const login = async (userData: any) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
      credentials:"include"
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    console.log("data:", data);
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    console.log("loginError:", message);
    throw error;
  }
};

export const logout =async ()=>{
  try{
    const response = await fetch(`${BASE_URL}/logout`,{
    credentials:"include"
  });
  
  if(!response.ok){
    throw new Error("Request failed")
  };

  const data =await response.json();
  console.log("data:",data);
  return data
  }catch(error){
    const message = error instanceof Error?error.message:"something went wrong";
    console.log("logoutError:",message)
  }
}
