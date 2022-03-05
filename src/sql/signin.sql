-- SIGNIN
-- get user and avatar details
select *
from jmiconnect.user,
      jmiconnect.avatar
where jmiconnect.user.userName = 'getUserName()'
      AND jmiconnect.user.password = 'getUserPassword()';
-- 
-- get all friends of this user
-- 
select *
from jmiconnect.friendship
where `to` = (
            select userID
            from jmiconnect.user
      )
      OR `from` = (
            select userID
            from jmiconnect.user
      );
-- 'from' and 'to' are a reserved keywords in sql that's why backticks are necessary