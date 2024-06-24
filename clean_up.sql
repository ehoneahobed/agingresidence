-- SQL script to clean up description_generated and review_generated columns


-- duplicate columns that may have markdown characters
-- ALTER TABLE residences ADD COLUMN description_generated_cleaned TEXT;
-- ALTER TABLE residences ADD COLUMN review_generated_cleaned TEXT;

-- Copy content into new columns
UPDATE residences
SET description_generated_cleaned = description_generated,
    review_generated_cleaned = review_generated;


-- Clean the Duplicated Columns
DELIMITER //

CREATE PROCEDURE CleanMarkdown()
BEGIN
  DECLARE done INT DEFAULT FALSE;
  DECLARE id_res INT;
  DECLARE description TEXT;
  DECLARE review TEXT;
  DECLARE cleaned_description TEXT;
  DECLARE cleaned_review TEXT;
  
  DECLARE cur CURSOR FOR SELECT id_residence, description_generated_cleaned, review_generated_cleaned FROM residences;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
  
  OPEN cur;

  read_loop: LOOP
    FETCH cur INTO id_res, description, review;
    IF done THEN
      LEAVE read_loop;
    END IF;

    -- Remove Markdown from description_generated_cleaned
    SET cleaned_description = description;
    SET cleaned_description = REPLACE(cleaned_description, '**', '');
    SET cleaned_description = REPLACE(cleaned_description, '#', '');
    SET cleaned_description = REPLACE(cleaned_description, '##', '');
    SET cleaned_description = REPLACE(cleaned_description, '###', '');
    SET cleaned_description = REPLACE(cleaned_description, '####', '');
    SET cleaned_description = REPLACE(cleaned_description, '#####', '');

    -- Remove Markdown from review_generated_cleaned
    SET cleaned_review = review;
    SET cleaned_review = REPLACE(cleaned_review, '**', '');
    SET cleaned_review = REPLACE(cleaned_review, '#', '');
    SET cleaned_review = REPLACE(cleaned_review, '##', '');
    SET cleaned_review = REPLACE(cleaned_review, '###', '');
    SET cleaned_review = REPLACE(cleaned_review, '####', '');
    SET cleaned_review = REPLACE(cleaned_review, '#####', '');

    -- Update the cleaned columns
    UPDATE residences
    SET description_generated_cleaned = cleaned_description,
        review_generated_cleaned = cleaned_review
    WHERE id_residence = id_res;
  END LOOP;

  CLOSE cur;
END //

DELIMITER ;


CALL CleanMarkdown();
