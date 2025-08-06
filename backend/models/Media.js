const { supabase } = require('../config/supabase');

class Media {
  static async create(mediaData) {
    const { data, error } = await supabase
      .from('media')
      .insert([mediaData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async findByListingId(listingId) {
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .eq('listing_id', listingId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  }

  static async delete(id) {
    const { error } = await supabase
      .from('media')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }

  static async uploadFile(file, listingId) {
    const fileName = `${listingId}/${Date.now()}-${file.originalname}`;
    const { data, error } = await supabase.storage
      .from('property-media')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from('property-media')
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  }
}

module.exports = { Media };