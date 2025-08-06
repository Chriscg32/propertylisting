const { supabase } = require('../config/supabase');

class Listing {
  static async create(listingData) {
    const { data, error } = await supabase
      .from('listings')
      .insert([listingData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('listings')
      .select(`
        *,
        media(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async findByUserId(userId) {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async findAll(filters = {}) {
    let query = supabase
      .from('listings')
      .select(`
        *,
        media(*),
        users(name, email)
      `);

    // Apply filters
    if (filters.propertyType) {
      query = query.eq('property_type', filters.propertyType);
    }
    if (filters.minPrice) {
      query = query.gte('price', filters.minPrice);
    }
    if (filters.maxPrice) {
      query = query.lte('price', filters.maxPrice);
    }
    if (filters.bedrooms) {
      query = query.gte('bedrooms', filters.bedrooms);
    }
    if (filters.location) {
      query = query.ilike('address', `%${filters.location}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  }

  static async update(id, listingData) {
    const { data, error } = await supabase
      .from('listings')
      .update(listingData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async delete(id) {
    const { error } = await supabase
      .from('listings')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }

  static async generateRefCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return `PL-${result}`;
  }
}

module.exports = { Listing };