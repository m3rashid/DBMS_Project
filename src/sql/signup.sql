-- SIGNUP
-- get() fields are input text fields from server
-- assumimg filtered data is passed into query after determining gender
insert into jmiconnect.avatar (avatarID, sex, hairStyle)
values (
                'Avatar UUID',
                'getGender()',
                'getHairStyle()'
        );
-- all other entries are inserted as default and can be modified by user
insert into jmiconnect.user (
                userID,
                userName,
                firstName,
                lastName,
                email,
                gender,
                avatarID,
                password
        )
values (
                'User UUID',
                'getUserName()',
                'getFirstName()',
                'getLastName()',
                'getEmail()',
                'getGender()',
                'getAvatarUUID()',
                'getPassword()'
        );
-- all other entries are inserted as default and can be modified by user
--