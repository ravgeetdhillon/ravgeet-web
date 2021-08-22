module Jekyll
  module TagFilters
    def get_related(input, count)
      related = input.tally.map(&:reverse).each_with_index
                   .sort_by(&:first).reverse
                   .take(count)
                   .map { |(_,s),_| s }
      related
    end
  end
end

Liquid::Template.register_filter(Jekyll::TagFilters)
