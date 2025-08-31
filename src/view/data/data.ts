import {
  BranchOfServices,
  InterviewQuestion,
  JobPositionLevel,
  LevelOfEducation,
  Quotes,
  Ranks,
  Skill,
  Style,
  Tone,
} from "@/types";

export const jobPositionLevel: JobPositionLevel[] = [
  { value: "Entry Level", label: "Entry Level" },
  { value: "Mid Level", label: "Mid Level" },
  { value: "Senior Level", label: "Senior Level" },
  { value: "Undecided/Any", label: "Undecided/Any" },
];

export const style: Style[] = [
  { value: "Formal", label: "Formal" },
  { value: "Semi-Formal", label: "Semi-Formal" },
  { value: "Creative", label: "Creative" },
  { value: "Innovative", label: "Innovative" },
];

export const tones: Tone[] = [
  { value: "Professional", label: "Professional" },
  { value: "Enthusiastic", label: "Enthusiastic" },
  { value: "Confident", label: "Confident" },
  { value: "Humble", label: "Humble" },
  { value: "Passionate", label: "Passionate" },
];

export const interviewFormatSelection: JobPositionLevel[] = [
  {
    value: "Experience/Background-based",
    label: "Experience/Background-based",
  },
  {
    value: "Behavioral",
    label: "Behavioral",
  },
  {
    value: "Situational",
    label: "Situational",
  },
  {
    value: "Motivation-based",
    label: "Motivation-based",
  },
  {
    value: "Competency-based",
    label: "Competency-based",
  },
  {
    value: "Technical",
    label: "Technical",
  },
  {
    value: "Consulting Case Interview questions",
    label: "Consulting Case Interview questions",
  },
  {
    value: "Brain Teaser",
    label: "Brain Teaser",
  },
  {
    value: "Nonsense",
    label: "Nonsense",
  },
];
export const ranks: Ranks[] = [
  { value: "E-1", label: "E-1" },
  { value: "E-2", label: "E-2" },
  { value: "E-3", label: "E-3" },
  { value: "E-4", label: "E-4" },
  { value: "E-5", label: "E-5" },
  { value: "E-6", label: "E-6" },
  { value: "E-7", label: "E-7" },
  { value: "E-8", label: "E-8" },
  { value: "O-1", label: "O-1" },
  { value: "O-2", label: "O-2" },
  { value: "O-3", label: "O-3" },
  { value: "O-4", label: "O-4" },
  { value: "O-5", label: "O-5" },
  { value: "O-6", label: "O-6" },
  { value: "O-7", label: "O-7" },
];

export const branchOfServices: BranchOfServices[] = [
  { value: "Air Force", label: "Air Force" },
  { value: "Army", label: "Army" },
  { value: "Navy", label: "Navy" },
  { value: "Space Force", label: "Space Force" },
  { value: "Marine Corps", label: "Marine Corps" },
  { value: "Coast Guard", label: "Coast Guard" },
  { value: "National Guard", label: "National Guard" },
  { value: "Army National Guard", label: "Army National Guard" },
  { value: "Army Reserve", label: "Army Reserve" },
  {
    value: "Marine Corps Forces Reserve",
    label: "Marine Corps Forces Reserve",
  },
  { value: "Navy Reserve", label: "Navy Reserve" },
  { value: "Air National Guard", label: "Air National Guard" },
  { value: "Air Force Reserve", label: "Air Force Reserve" },
  { value: "Coast Guard Reserve", label: "Coast Guard Reserve" },
];

export const levelOfEducation: LevelOfEducation[] = [
  {
    value: "High School Diploma",
    label: "High School Diploma",
  },
  {
    value: "Bachelor’s",
    label: "Bachelor’s",
  },
  {
    value: "Master’s",
    label: "Master’s",
  },
  {
    value: "Doctorate",
    label: "Doctorate",
  },
  {
    value: "Military Education",
    label: "Military Education",
  },
  {
    value: "Associates",
    label: "Associates",
  },
  {
    value: "Other",
    label: "Other",
  },
];

export const skillsInCareerField: Skill[] = [
  { value: "abc", label: "abc" },
  { value: "def", label: "def" },
  { value: "ghi", label: "ghi" },
  { value: "jkl", label: "jkl" },
];

export const industryOfInterest: { value: string; label: string }[] = [
  { label: "Undecided/Any", value: "Undecided/Any" },
  { label: "Aerospace/Aviation", value: "Aerospace/Aviation" },
  { label: "Artificial Intelligence", value: "Artificial Intelligence" },
  { label: "Automotive", value: "Automotive" },
  {
    label: "Biotechnology/Bioengineering",
    value: "Biotechnology/Bioengineering",
  },
  {
    label: "Computers/Electronics/Telecom",
    value: "Computers/Electronics/Telecom",
  },
  { label: "Construction", value: "Construction" },
  {
    label: "Consulting (General/Defense)",
    value: "Consulting (General/Defense)",
  },
  { label: "Consulting (Management)", value: "Consulting (Management)" },
  { label: "Contracting", value: "Contracting" },
  { label: "Crypto", value: "Crypto" },
  { label: "Cyber Security", value: "Cyber Security" },
  { label: "Defense", value: "Defense" },
  {
    label: "Diversified Financial Services",
    value: "Diversified Financial Services",
  },
  { label: "Education", value: "Education" },
  { label: "Energy", value: "Energy" },
  { label: "Energy (Renewable/Green)", value: "Energy (Renewable/Green)" },
  { label: "Engineering (General/Any)", value: "Engineering (General/Any)" },
  {
    label: "Engineering (Software/Computer)",
    value: "Engineering (Software/Computer)",
  },
  { label: "Engineering (Aerospace)", value: "Engineering (Aerospace)" },
  { label: "Engineering (Mechanical)", value: "Engineering (Mechanical)" },
  { label: "Entrepreneur", value: "Entrepreneur" },
  {
    label: "Fire-Fighter/First-Responder",
    value: "Fire-Fighter/First-Responder",
  },
  { label: "Finance", value: "Finance" },
  { label: "FinTech", value: "FinTech" },
  {
    label: "Food & Beverage/Hospitality",
    value: "Food & Beverage/Hospitality",
  },
  { label: "Gaming", value: "Gaming" },
  { label: "Government", value: "Government" },
  { label: "Healthcare", value: "Healthcare" },
  { label: "Healthcare Technology", value: "Healthcare Technology" },
  { label: "Insurance", value: "Insurance" },
  {
    label: "Investment Banking/Brokerage",
    value: "Investment Banking/Brokerage",
  },
  { label: "Investment Management", value: "Investment Management" },
  { label: "Journalism/Publication", value: "Journalism/Publication" },
  { label: "Legal Services", value: "Legal Services" },
  { label: "Manufacturing", value: "Manufacturing" },
  { label: "Marketing/Public Affairs", value: "Marketing/Public Affairs" },
  { label: "Media/Entertainment/Sports", value: "Media/Entertainment/Sports" },
  { label: "Nonprofit (General)", value: "Nonprofit (General)" },
  { label: "Pharmaceuticals", value: "Pharmaceuticals" },
  { label: "Private Equity", value: "Private Equity" },
  { label: "Real Estate", value: "Real Estate" },
  { label: "Retail/CPG", value: "Retail/CPG" },
  {
    label: "Restaurant/Hotel/Hospitality",
    value: "Restaurant/Hotel/Hospitality",
  },
  { label: "Sales (General)", value: "Sales (General)" },
  { label: "Social Media", value: "Social Media" },
  { label: "Supply Chain/Logistics", value: "Supply Chain/Logistics" },
  {
    label: "Technology/Software/Internet",
    value: "Technology/Software/Internet",
  },
  { label: "Venture Capital", value: "Venture Capital" },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    title: "Experience/Background-based",
    description:
      'Purpose is to subjectively evaluate the experiences in your background. Examples: "What did you learn in x class?" and "What were your responsibilities in that position?',
  },
  {
    title: "Behavioral",
    description:
      "Purpose is to objectively measure past behaviors as a potential predictor of future results. Examples: “Tell me about a time you didn’t deliver according to expectations. What did you learn for the next time?” , “Tell me about a time when you had to collaborate with someone to get things done.”, “Tell me about a time when you faced a challenge at work. How did you handle or solve the challenge?",
  },
  {
    title: "Situational",
    description:
      "Purpose is to target specific issues and challenges that may occur in the workplace, particularly those where a solution is needed. Examples: “You realize your manager has made a big mistake on an important project. What would you do?”, “What would you do if you thought your workload was too heavy?”, “What would you do if a team member wasn’t pulling their weight on a group project?",
  },
  {
    title: "Motivation-based",
    description:
      "Purpose is to uncover the drive and enthusiasm behind someone’s job application. They can help to reveal a candidate’s reasons for applying and whether their values align with the organization’s values. Examples: “What are your biggest aspirations in your life – work or otherwise?”, “Walk me through your career from when you left high school. Why did you study what you did or take the path you did?”, “What do you enjoy most / least about your role / current company?",
  },
  {
    title: "Competency-based",
    description:
      "Purpose is to uncover whether an individual’s skill set matches what the organization is looking for. These questions require candidates to discuss their existing skills as well as those they’d like to develop. Examples: “Which of your skills do you think will be particularly relevant for this role?”, “What is one professional or technical skill you would most like to develop?”, “How have you used your skills to resolve problems in past roles?",
  },
  {
    title: "Technical Interview",
    description:
      "Purpose of the technical interview is primarily for employers recruiting for engineering, science, or software roles. Essentially it is an interview to assess your technical ability for the role, and the depth and breadth of your knowledge in your chosen field. Examples: “Describe Quicksort.”, “Write some pseudo code to raise a number to a power”, “How would you design a touch interface for a device?” “How does the strength to weight ratio compare for aluminum vs. steel?",
  },
  {
    title: "Consulting Case Interview questions",
    description:
      "Purpose is to evaluate your problem-solving abilities and how you would analyze and work through potential case situations. Examples: “You’re having lunch with an old friend from university, and she’s looking for some business advice. She is thinking of opening a coffee shop in Cambridge, England, a large university city an hour and a half away from London. She sees potential in this business but wants your help in determining whether opening a coffee shop is a good idea. What do you think?”, “Your client is a ski resort. Global warming has made it such that natural snowfall has been reduced by 50%. They client is concerned. What should they do and why?”, “Your client is a gas station and the market is so competitive that they make no money on gasoline sales. All the profit is in convenience store sales. What is the profit maximizing way to layout the convenience store and why?”, “Your client is Motorola. The year is 1980. They just invented the cellular phone 3 years ago. They want you to estimate the market demand for cell phones over the next 30 years and tell them if there is a market for this invention (and prove it)”, “Your nephew runs a lemonade stand. Yesterday was Monday and he was open from 2pm – 5pm, and sold 2 cups. What should he do differently tomorrow?”",
  },
  {
    title: "Brain Teaser",
    description:
      "Purpose is to assess the candidate’s logic and math skills, critical thinking, and creativity.  Examples: “Why is a tennis ball fuzzy?”,  “What is the angle of the hands of the clock at 8:13 am?”,  “How would you describe sandwiches to someone who has never seen one?”",
  },
  {
    title: "Nonsense",
    description:
      'The purpose is to get past your pre-programmed answers to find out if you are capable of an original thought. There is not necessarily a right or wrong answer, since it is used primarily to test your ability to think on your feet. Examples: "What kind of animal would you like to be?", "What color best describes you?"',
  },
];

// export const availableLanguages = [
//   "English",
//   "Chinese (Mandarin)",
//   "Spanish",
//   "Hindi",
//   "Arabic",
//   "Bengali",
//   "Portuguese",
//   "Russian",
//   "Japanese",
//   "Punjabi",
//   "German",
//   "Javanese",
//   "French",
//   "Telugu",
//   "Marathi",
//   "Tamil",
//   "Urdu",
//   "Turkish",
//   "Korean",
//   "Vietnamese",
// ];

export const availableLanguages = [
  { value: 1, label: "English" },
  { value: 2, label: "Chinese (Mandarin)" },
  { value: 3, label: "Spanish" },
  { value: 4, label: "Hindi" },
  { value: 5, label: "Arabic" },
  { value: 6, label: "Bengali" },
  { value: 7, label: "Portuguese" },
  { value: 8, label: "Russian" },
  { value: 9, label: "Japanese" },
  { value: 10, label: "Punjabi" },
  { value: 11, label: "German" },
  { value: 12, label: "Javanese" },
  { value: 13, label: "French" },
  { value: 14, label: "Telugu" },
  { value: 15, label: "Marathi" },
  { value: 16, label: "Tamil" },
  { value: 17, label: "Urdu" },
  { value: 18, label: "Turkish" },
  { value: 19, label: "Korean" },
  { value: 20, label: "Vietnamese" },
];

export const quotes: Quotes[] = [
  {
    id: 0,
    title:
      "During World War II, the U.S. Army operated a Ghost Army, a unit tasked with using inflatable tanks, fake radio traffic, and phony battlefield noise to mislead German forces. This unit's deception tactics were credited with saving thousands of lives.",
  },
  {
    id: 1,
    title:
      "The Great Los Angeles Air Raid of 1942, also known as the Battle of Los Angeles, was a false alarm where U.S. coastal artillery fired on supposed Japanese aircraft, which turned out to be a weather balloon",
  },
  {
    id: 2,
    title:
      "In the American Civil War, the Union Army Balloon Corps was established, marking one of the first uses of aircraft for military reconnaissance in the United States. This corps provided vital intelligence by observing Confederate troop movements from the sky.",
  },
  {
    id: 3,
    title:
      "The U.S. Navy SEALs originated during World War II as the Underwater Demolition Teams (UDTs), expert swimmers who would reconnoiter landing beaches, clear obstacles and engage in sabotage ahead of amphibious landings.",
  },
  {
    id: 4,
    title:
      "In the Civil War, the Confederate submarine H.L. Hunley became the first submersible to sink an enemy warship, the USS Housatonic, in 1864, despite the submarine itself sinking shortly after.",
  },
  {
    id: 5,
    title:
      "During the American Revolution, George Washington's use of a network of spies known as the Culper Ring was vital for gathering intelligence on British troop movements and intentions.",
  },
  {
    id: 6,
    title:
      "The WAC (Women's Army Corps) was established during World War II, allowing women to serve in non-combat roles. Over 150,000 women served, freeing men for combat.",
  },
  {
    id: 7,
    title:
      "The Battle of Hampton Roads during the Civil War featured the first clash between ironclad warships, the USS Monitor and the CSS Virginia, signaling the end of the era of wooden warships.",
  },
  {
    id: 8,
    title:
      "Operation Paperclip was a secret program of the Joint Intelligence Objectives Agency largely carried out by Special Agents of Army CIC in which more than 1,600 German scientists, engineers, and technicians were taken from Germany to America for U.S. government employment after the end of World War II in Europe.",
  },
  {
    id: 9,
    title:
      "The U.S. military's last cavalry charge was in 1942, when the U.S. Army's 26th Cavalry Regiment charged against Japanese forces in the Philippines.",
  },
  {
    id: 10,
    title:
      "The Native American Code Talkers, particularly from the Navajo nation, played a crucial role in World War II by using their languages to create unbreakable codes.",
  },
  {
    id: 11,
    title:
      "During the Korean War, the Battle of Chosin Reservoir saw U.S. Marines and Army soldiers successfully break through a much larger Chinese force while enduring freezing temperatures.",
  },
  {
    id: 12,
    title:
      "The Pentagon, headquarters of the U.S. Department of Defense, is one of the world's largest office buildings with about 6.5 million square feet of floor space.",
  },
  {
    id: 13,
    title:
      "In 1959, the U.S. Air Force started Project Blue Book, a series of systematic studies of unidentified flying objects (UFOs). It was terminated in December 1969.",
  },
  {
    id: 14,
    title:
      "The 442nd Regimental Combat Team, composed almost entirely of second-generation American soldiers of Japanese ancestry (Nisei), became the most decorated unit for its size and length of service in the history of American warfare.",
  },
  {
    id: 15,
    title:
      "The USS Constitution, also known as Old Ironsides, is the world's oldest commissioned naval vessel still afloat, launched in 1797.",
  },
  {
    id: 16,
    title:
      "The Doolittle Raid in 1942 was the first U.S. air attack on the Japanese mainland and proved significant for American morale, showing that Japan was vulnerable to American air attacks.",
  },
  {
    id: 17,
    title:
      "The U.S. Military Academy at West Point is the oldest continuously occupied military post in America, founded in 1802.",
  },
  {
    id: 18,
    title:
      "In 1918, Sergeant Stubby became the most decorated war dog of World War I and the only dog to be nominated for rank and then promoted to sergeant through combat.",
  },
  {
    id: 19,
    title:
      "The Berlin Airlift (1948-1949), one of the first major crises of the Cold War, saw the U.S. Air Force and British Royal Air Force delivering food and supplies to West Berlin while the city was blockaded by the Soviet Union.",
  },
  {
    id: 20,
    title:
      "During World War I, the U.S. government encouraged the population to plant Victory Gardens. These personal gardens helped to prevent food shortages and allowed more resources to be directed to the troops overseas.",
  },
  {
    id: 21,
    title:
      "The Battle of Kursk in 1943 was the largest tank battle in history, involving some 6,000 tanks, 2 million men, and 4,000 aircraft, marking a decisive Soviet victory against Nazi Germany on the Eastern Front.",
  },
  {
    id: 22,
    title:
      "The phrase the whole nine yards, meaning everything, the full extent, may have originated from World War II fighter pilots in the Pacific Theater referring to the length of an ammunition belt; when a pilot fired off all their ammo at a target, they gave it the whole nine yards.",
  },
  {
    id: 24,
    title:
      "The first military submarine, named Turtle for its shape, was built in 1775 by American David Bushnell to attack British vessels during the American Revolutionary War.",
  },
  {
    id: 25,
    title:
      "The Battle of Hampton Roads during the Civil War featured the first clash between ironclad warships, the USS Monitor and the CSS Virginia, signaling the end of the era of wooden warships.",
  },
  {
    id: 26,
    title:
      "During the 1800s, the British Empire's military red coat was one of the most recognizable military uniforms, meant to hide bloodstains and project a striking image on the battlefield.",
  },
  {
    id: 27,
    title:
      "In ancient Rome, the military's training techniques were so advanced that they could build a fortified camp each night while on the move.",
  },
  {
    id: 28,
    title:
      "The Christmas Truce of 1914 during World War I was a series of unofficial ceasefires along the Western Front when German and Allied soldiers exchanged seasonal greetings, songs, and even gifts.",
  },
  {
    id: 29,
    title:
      "Julius Caesar's Roman legions employed the testudo formation, a tight, box-like arrangement of shields, providing excellent protection against arrows and other projectiles during sieges and battles.",
  },
  {
    id: 30,
    title:
      "The Mad Bomber, Joseph Kittinger, set the world record for the highest skydive from a height greater than 102,800 feet (31,300 meters) in 1960, a record that stood until 2012. He was a Captain in the U.S. Air Force at the time.",
  },
  {
    id: 31,
    title:
      "The Battle of Hampton Roads during the Civil War featured the first clash between ironclad warships, the USS Monitor and the CSS Virginia, signaling the end of the era of wooden warships.",
  },
  {
    id: 32,
    title:
      "The only time a reigning British monarch has come under enemy fire was during World War II when Queen Elizabeth II, then a princess, served as a driver and mechanic in the Auxiliary Territorial Service.",
  },
  {
    id: 33,
    title:
      "The Battle of Agincourt in 1415 was a pivotal moment in the Hundred Years' War, where the vastly outnumbered English army defeated the French thanks to the longbow's superior range and rate of fire.",
  },
  {
    id: 34,
    title:
      "The ancient Greek city-state of Sparta was so dedicated to military excellence that Spartan boys began their military training, known as the agoge, at the age of seven.",
  },
  {
    id: 35,
    title:
      "During the Napoleonic Wars, the British Royal Navy's HMS Dreadnought made the term dreadnought synonymous with battleships, due to its revolutionary design and powerful armament.",
  },
  {
    id: 36,
    title:
      "In 1898, during the Spanish-American War, Teddy Roosevelt led the Rough Riders in a charge up San Juan Hill, Cuba, which was a defining moment in his political career and brought him national fame..",
  },
  {
    id: 37,
    title:
      "During World War II, the Soviet Night Witches were an all-female bombing regiment who terrorized the German army with nighttime bombing raids, flying biplanes made mostly of wood and canvas.",
  },
  {
    id: 38,
    title:
      "The Winged Hussars, an elite Polish cavalry unit that fought from the 16th to 18th centuries, were famous for their huge wings, a wooden frame carrying eagle, ostrich, swan, or goose feathers.",
  },
  {
    id: 39,
    title:
      "The Miracle of Dunkirk in 1940 witnessed an unprecedented evacuation of Allied troops from Dunkirk, France, with civilian vessels playing a crucial role in rescuing over 330,000 soldiers.",
  },
  {
    id: 40,
    title:
      "The Battle of Saragarhi in 1897 saw 21 Sikh soldiers of the British Indian Army defend an army post against 10,000 Afghan tribesmen. The defenders chose to fight to the death and are remembered for their extraordinary bravery.",
  },
  {
    id: 41,
    title:
      "In the late 18th century, Russia established a Potemkin village facade, a fake portable village built only to impress Empress Catherine II during her journey to Crimea.",
  },
  {
    id: 42,
    title:
      "During the Vietnam War, the Ho Chi Minh trail was not a single route but a complex network of paths and tunnels used by North Vietnam to transport supplies to its forces and allies in the South.",
  },
  {
    id: 43,
    title:
      "The HMS Victory, Admiral Nelson's flagship at the Battle of Trafalgar in 1805, is still commissioned by the Royal Navy, making it the oldest naval ship still in commission.",
  },
  {
    id: 44,
    title:
      "The Battle of Hastings in 1066 was so transformative that it changed the English language, bringing in a vast array of French words and altering the course of English history.",
  },
  {
    id: 45,
    title:
      "Operation Entebbe in 1976 was a dramatic hostage-rescue mission carried out by Israeli commandos at Entebbe Airport in Uganda, which saw the rescue of over 100 hostages.",
  },
  {
    id: 46,
    title:
      "The Siege of Leningrad during World War II lasted for 872 days, with the city's residents enduring extreme starvation and winter conditions.",
  },
  {
    id: 47,
    title:
      "During the Zulu Wars, the British suffered one of their most significant defeats at the Battle of Isandlwana in 1879, largely due to the Zulus' superior numbers and tactics.",
  },
  {
    id: 48,
    title:
      "The Green Berets, officially known as the United States Army Special Forces, were established in 1952 and are renowned for their roles in unconventional warfare, foreign internal defense, and counter-terrorism.",
  },
  {
    id: 49,
    title:
      "The White Mouse was the codename of Nancy Wake, a leading figure in the French Resistance during World War II and the Gestapo's most-wanted person with a 5 million-franc price on her head.",
  },
  {
    id: 50,
    title:
      "The Maginot Line, built by France in the 1930s to deter German aggression, became a famous example of military preparation overtaken by advances in technology and tactics.",
  },
  {
    id: 51,
    title:
      "The Charge of the Light Brigade during the Battle of Balaclava in 1854 became infamous due to the miscommunication that led British cavalry directly into a well-prepared Russian artillery ambush.",
  },
  {
    id: 52,
    title:
      "Genghis Khan's Mongol Empire was renowned for its military strategies, such as the feigned retreat to draw enemies into an ambush and the use of psychological warfare to intimidate opponents.",
  },
  {
    id: 53,
    title:
      "The Battle of Thermopylae in 480 BC showcased the Spartans' martial prowess, where a small Greek force led by King Leonidas made a heroic stand against the much larger Persian army.",
  },
  {
    id: 54,
    title:
      "The Six-Day War in 1967 between Israel and neighboring states of Egypt, Jordan, and Syria saw Israel make significant territorial gains, dramatically changing the map of the Middle East..",
  },
  {
    id: 55,
    title:
      "In World War I, animals were used extensively, with over 16 million animals serving, including horses, mules, dogs, and pigeons for communication.",
  },
  {
    id: 56,
    title:
      "During the Cold War, the U.S. government built a Doomsday Plane, a modified Boeing 747 designed to serve as a flying command post in the event of a nuclear war.",
  },
  {
    id: 57,
    title:
      "The Battle of Carrhae in 53 BC was one of the Roman army's most severe defeats, inflicted by the Parthian Empire, highlighting the limitations of the Roman legions when fighting in the East.",
  },
  {
    id: 58,
    title:
      "In the 18th century, Russia's Peter the Great created a modern navy from scratch, even working incognito in Western Europe to learn shipbuilding techniques firsthand.",
  },
  {
    id: 59,
    title:
      "The legendary 300 Spartans who fought at Thermopylae in 480 BC were actually accompanied by several thousand other Greek allies, contrary to popular belief.",
  },
  {
    id: 60,
    title:
      "The Battle of Trafalgar in 1805 established British naval supremacy and was notable for Lord Nelson's unusual tactic of sailing perpendicularly into the enemy fleet, breaking their line",
  },
  {
    id: 61,
    title:
      "During the American Revolution, the first submarine attack took place in New York Harbor in 1776 when the Turtle attempted to affix explosives to the hull of a British warship.",
  },
  {
    id: 62,
    title:
      "In World War I, Paris taxis were famously used to transport troops to the front during the First Battle of the Marne in 1914, in what became known as the Taxicab Army.",
  },
  {
    id: 63,
    title:
      "The “Christmas Truce” of 1914 was not an isolated incident but occurred at various points along the Western Front, with troops from opposing sides even playing impromptu games of soccer.",
  },
  {
    id: 64,
    title:
      "The Battle of the Atlantic, which lasted for the duration of World War II, was the longest continuous military campaign in the war, involving thousands of ships over hundreds of convoy routes.",
  },
  {
    id: 65,
    title:
      "In the 15th century, the Korean admiral Yi Sun-sin developed the turtle ship, an armored warship used with great effect against the Japanese navy during the Imjin War.",
  },
  {
    id: 66,
    title:
      "During the Cold War, the U.S. planned for the possibility of space warfare, creating the X-20 Dyna-Soar, a manned space plane that could have been used for satellite maintenance, reconnaissance, and even bombing.",
  },
  {
    id: 67,
    title:
      "The use of war elephants dates back to ancient times and was a significant factor in battles such as the Battle of Raphia in 217 BC, which was one of the largest battles of the Hellenistic kingdoms.",
  },
  {
    id: 68,
    title:
      "During the Cuban Missile Crisis in 1962, the world came the closest it's ever been to a full-scale nuclear war, with both U.S. and Soviet forces on high alert.",
  },
  {
    id: 69,
    title:
      "The Battle of Stalingrad in World War II is considered by many historians to be the turning point of the war in Europe, with Soviet forces encircling and defeating the German 6th Army.",
  },
  {
    id: 70,
    title:
      "In 1804, during the Napoleonic Wars, Britain launched the first successful underwater demolition attack using a torpedo, a term coined by Robert Fulton, against a French ship",
  },
  {
    id: 71,
    title:
      "The Gulf War of 1991 saw the first use of GPS technology in combat, providing coalition forces with a significant navigational advantage in the desert.",
  },
  {
    id: 72,
    title:
      "The Knights Templar, a medieval Christian military order, became wealthy and influential by running a network of banks and gaining control of numerous fortifications across the Holy Land.",
  },
  {
    id: 73,
    title:
      "In the 19th century, the British Empire commonly used a scorched earth policy, most notoriously during the Boer War in South Africa to prevent Boer guerillas from obtaining resources.",
  },
  {
    id: 74,
    title:
      "The M.A.S.H. (Mobile Army Surgical Hospital) units were first established during the Korean War and dramatically increased the survival rate of wounded soldiers.",
  },
  {
    id: 75,
    title:
      "In 1941, the Soviet Union moved entire fa tories by train from European Russia to Siberia to escape the advancing German army, reassembling them to continue production.",
  },
  {
    id: 76,
    title:
      "The P-51 Mustang, one of the most iconic aircraft of World War II, was initially designed and built for the British RAF and only later became a mainstay of the U.S. Army Air Forces.",
  },
];
