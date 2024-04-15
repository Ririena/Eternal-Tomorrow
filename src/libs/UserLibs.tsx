import { supabase } from "../utils/supabase";

// Ambil Data User Berdasarkan Email
export const getUserByEmail = async (email: any) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(email);

    return user;
  } catch (error) {
    throw error;
  }
};

// Ambil Data User Berdasarkan Table Yakni Email Juga
export const getUserFromTable = async (email: any) => {
  try {
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("email", email)
      .single();

    if (error) {
      throw error;
    }

    if (data) {
      const { data: avatarData } = await supabase.storage
        .from("avatar")
        .getPublicUrl(data.avatar);

      if (avatarData) {
        data.avatar = avatarData.publicUrl;
      }
    }
    return data;
  } catch (error) {
    throw error;
  }
};
