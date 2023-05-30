import supabase from '../database/supabase';

/**
 * Fetches Object array of facts from Supabase Database, filtered by category passed in.
 * @param {String} currentCategory Active category button, to filter facts results from Database
 * @returns {Object[]} facts - An array of fact objects
 */
const fetchFacts = async currentCategory => {
  try {
    let query = supabase.from('facts').select('*');

    if (currentCategory !== 'all')
      query = query.eq('category', currentCategory);

    const { data: facts, error } = await query
      .order('votesInteresting', { ascending: false })
      .limit(1000);

    if (error)
      throw new Error(
        `Failed to read from database: ${error.message}. ${error.hint}`
      );

    // return facts array of objects
    return facts;
  } catch (err) {
    throw err;
  }
};

export default fetchFacts;
