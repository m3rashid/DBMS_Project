-- Update User Details
-- get() fields are input text fields from update details page
UPDATE jmi_connect.user
set firstName = 'getModifiedFirstName()',
  lastName = 'getModifiedLastName()',
  phNumber = 'getModifiedPhNo()',
  gender = 'getModifiedGender()',
  dob = 'getModifiedDOB()'
where userID = 'User UUID';
-- 
-- Update Avatar
-- 
UPDATE jmi_connect.avatar
set sex = 'getGender()',
  faceColor = 'getFaceColor()',
  earSize = 'getEarSize()',
  hairColor = 'getHairColor()',
  hairStyle = 'getHairStyle()',
  hatColor = 'getHatColor()',
  hatStyle = 'getHatStyle()',
  glassesStyle = 'getGlassesStyle()',
  noseStyle = 'getNoseStyle()',
  mouthStyle = 'getMouthStyle()',
  shirtStyle = 'getShirtStyle()',
  shirtColor = 'getShirtColor()',
  bgColor = 'getBgColor()',
  isGradient = 'getIsGradient()'
where avatarID = 'Avatar UUID';