export const calculateAge = (birthday: string) => {
  const birthDateDate = new Date(birthday);

  // Get the current date
  const currentDate = new Date();

  // Calculate the age by subtracting the birth date from the current date
  let age = currentDate.getFullYear() - birthDateDate.getFullYear();

  if (
    currentDate.getMonth() < birthDateDate.getMonth() ||
    (currentDate.getMonth() === birthDateDate.getMonth() &&
      currentDate.getDate() < birthDateDate.getDate())
  ) {
    return age--;
  }

  return age;
};
