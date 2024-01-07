import React from 'react';
import Layout from '../components/layout';

const ProjectsPage = () => {
  return (
    <Layout> {/* use the Layout component to wrap your content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">My Projects</h1>
        {/* Add your projects here */}
      </div>
    </Layout>
  );
};

export default ProjectsPage;