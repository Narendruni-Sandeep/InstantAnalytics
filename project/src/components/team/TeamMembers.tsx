import React from 'react';
import { motion } from 'framer-motion';
import { Code, HeadphonesIcon, TrendingUp } from 'lucide-react';

const teamMembers = [
  {
    name: 'Pranav Garg',
    role: 'Lead Developer',
    description: 'Full-stack developer with expertise in React and Node.js. Passionate about creating efficient and scalable solutions.',
    icon: Code,
    imageUrl: 'https://media.licdn.com/dms/image/v2/D5603AQFrqp5OMmqcCw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1684153939668?e=1739404800&v=beta&t=Hu3mp5d5VMqvgXwpNkaDyTcMOhq4peEdaxmucPaSnd4'
  },
  {
    name: 'Bharatt Arorah',
    role: 'Sales Manager',
    description: 'Experienced sales professional helping businesses optimize their email outreach strategies.',
    icon: TrendingUp,
    imageUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQHz4dF-BkuCag/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1685513430432?e=1739404800&v=beta&t=b_AZO33ZLfE_dV6FZhC7BsxVqSSvUxn_x453nylRnA4'
  },
  {
    name: 'Malyakula Saivamsi',
    role: 'Customer Success',
    description: 'Dedicated to ensuring our clients get the most value from InstantAnalytics through exceptional support.',
    icon: HeadphonesIcon,
    imageUrl: 'https://media.licdn.com/dms/image/v2/D5603AQEL0bedcwUldA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1726682447157?e=1739404800&v=beta&t=50AI-KRnX22EG45sQe1lROmgPdzaaiHk5g1oWCNCPV8'
  }
];

export function TeamMembers() {
  return (
    <section className="py-24 bg-background relative">
      <div className="container relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/10">
                <div className="relative h-full w-full group">
                  {/* Image */}
                  <img 
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover filter grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-110"
                  />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-6 rounded-xl bg-card border border-border"
              >
                <div className="p-2 rounded-lg bg-primary/10 w-fit mx-auto mb-4">
                  <member.icon className="w-5 h-5 text-primary" />
                </div>

                <h3 className="text-xl font-display font-semibold mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-muted-foreground">
                  {member.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}