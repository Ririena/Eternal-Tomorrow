import react, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/utils/supabase';
const navigate = useNavigate()
const [userEmail, setUserEmail] = useState(null);
const [existingUserName, setExistingUserName] = useState("");
const [isLoading, setIsLoading] = useState(true);
const [verify, setVerify] = useState(null);
useEffect(() => {
  const fetchUserData = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (user) {
        navigate("/verify");
      }
      if (error) {
        console.error(error.message);
      } else {
        setUserEmail(user.email);

        const { data, error } = await supabase
          .from("user")
          .select("nama_user")
          .eq("email", user.email)
          .single();

        if (error) {
          console.error(error.message);
        } else {
          if (data) {
            setExistingUserName(data.nama_user);
          }
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  fetchUserData();
}, []);