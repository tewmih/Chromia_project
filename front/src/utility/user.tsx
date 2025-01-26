const personNames = [
  "Abebe",
  "Birhanu",
  "Gebre",
  "Kebede",
  "Mesfin",
  "Fikadu",
  "Dawit",
  "Haile",
  "Mulugeta",
  "Asnake",
  "Yared",
  "Getachew",
  "Abel",
  "Abeba",
  "Tigist",
  "Meklit",
  "Betelhem",
  "Eyerus",
  "Selam",
  "Meseret",
  "Tsion",
  "Hirut",
  "Fikir",
  "Genet",
  "Rediet",
  "Rahel",
  "Saron",
  "Mulu",
];

export function getRandomUserName() {
  const randomIndex = Math.floor(Math.random() * personNames.length);
  return personNames[randomIndex];
}
