CREATE OR REPLACE FUNCTION notify_trigger() RETURNS trigger AS $$
    BEGIN
        PERFORM pg_notify('pub_sub', row_to_json(NEW)::text);
        return NEW;
    END;
$$ LANGUAGE plpgsql;


DROP TRIGGER IF EXISTS on_update_contact on contacts;
CREATE Trigger on_update_contact
AFTER INSERT OR UPDATE ON contacts
FOR EACH ROW
EXECUTE PROCEDURE notify_trigger();