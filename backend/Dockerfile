# Use the official Ruby image
FROM ruby:2.7.8

# Install dependencies
RUN apt-get update -qq && \
    apt-get install -y build-essential \
                       libpq-dev \
                       postgresql-client \
                       nodejs

# Set working directory
WORKDIR /app

# Install bundler
RUN gem install bundler:2.4.19

# Copy Gemfile and Gemfile.lock
COPY Gemfile Gemfile.lock ./

# Install gems
RUN bundle install

# Copy the rest of the application
COPY . .

# Precompile bootsnap code for faster boot times
RUN bundle exec bootsnap precompile --gemfile

# Add a script to be executed every time the container starts
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# Start the main process
CMD ["rails", "server", "-b", "0.0.0.0"]
