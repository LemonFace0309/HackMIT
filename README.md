# HackMIT

It is widely agreed upon that water is the most valuable resource, yet the majority of individuals are uninformed and powerless to improve the quality of local water bodies.

Suppose you see a sudden influx of algae in a local pond, or that you pass by a local river but you notice it's all dried up, what would you do? The answer is unclear for most people, and that's the problem we want to solve.

That's why we decided to build AquaGuard. Revolutionizing Water Quality Monitoring for a Sustainable Future

Our mission is simple: to provide comprehensive water quality data to people worldwide, empowering everyone to protect the water they rely on for life and sustenance. Inspired by the once-famous but now polluted Charles River, we are determined to prevent others from witnessing their local water supplies degrade without the means to intervene.

AquaGuard combines satellite and crowdsourced imagery with local wildlife and human population data to yield insightful implications about water quality. This multifaceted approach not only ensures the accuracy of our assessments but also sheds light on the intricate relationships between ecosystems and human communities.

But we don't stop at data. AquaGuard equips individuals with the resources they need to safeguard their water sources effectively. From EPA registered algaecides to local vegetation planting initiatives, tools to report illegal dumping, and warnings about droughts, we empower communities to take tangible action.

Our vision is simple: water is the quintessential enabler of life, and everyone, regardless of their resources, deserves access to information about the water they rely on. Join us at HackMIT and be a part of the AquaGuard revolution, as we work towards a sustainable future where water quality is a concern of the past. Together, we can ensure that no one is powerless in the face of water pollution, safeguarding the life-giving essence of our planet for the next generation.


water quality + wildlife health + predictions???
contextual powered AI recommendations & implications w/ context + LLMS 


e.g. 
-# of ppl in this place (relying on it) 
-# this amt of wildlife 


data viz dashboard (Charles)
model to predict water quality (Mabel)
Synthesize w/ APIs for wildlife health (Mabel)
API to communicate (Charles & Mabel)
LLMs w/ prompts (William)
Business pitching (William)


## Potential Partnerships:
### Eco-friendly Product Manufacturers:
Brands that produce sustainable water treatment solutions, from algaecides to bio-augmentation 
Sound Agriculture: This company, based out of nearby Emeryville, California, focuses on sustainable agriculture solutions. They have products or technologies that can be adapted for water treatment and conservation.

GreenTech Life: They offer sustainable solutions for home and garden. Their range of products includes those for water purification and eco-friendly farming. Provides access to products tailored for individual households in Boston.

### Local Environmental NGOs & Agencies:
They can provide expertise, resources, and manpower for larger projects or community initiatives. 

The Charles River Watershed Association (CRWA): Organization dedicated to protecting, preserving, and enhancing the Charles River and its watershed. They conduct regular water quality monitoring and have various programs to improve water health. Partnering with CRWA can provide expertise, volunteer manpower, and credibility in the Boston community.

Massachusetts Rivers Alliance: This organization advocates for the health and restoration of rivers in Massachusetts. They could be a valuable partner for statewide initiatives and can offer insights and resources to support AquaGuard's mission.

### Government Agencies:
Partnering with local, state, or federal environmental agencies can provide legitimacy, access to grants, and potential integration into larger-scale projects.

Massachusetts Department of Environmental Protection (MassDEP): This state agency oversees environmental regulation in Massachusetts. By partnering with MassDEP, AquaGuard can gain access to a wealth of data, potentially apply for grants, and collaborate on larger projects aimed at water conservation and quality improvement.

Boston Water and Sewer Commission (BWSC): Responsible for providing water and wastewater services to Boston residents. A partnership could provide insights into water quality metrics and help roll out community initiatives more effectively.

Environmental Protection Agency (EPA) Region 1: This regional office of the EPA oversees environmental protection efforts in the New England area, including Massachusetts. Collaboration here can offer legitimacy, potential grant opportunities, and integration into federal initiatives.


# To edit:
### Problem Statement:
In today's rapidly urbanizing world, water bodies face significant threats from pollution, industrial discharge, and more. These deteriorating water qualities not only pose a direct risk to human health through waterborne diseases but also threaten aquatic wildlife. While there are tools to measure water quality and separate systems monitoring human health and wildlife conservation, there's a significant gap in holistic platforms that provide real-time insights into the implications of changing water qualities.

### Novelty:
What sets AquaGuard apart is its integrated approach. Unlike conventional systems that treat water quality, human health, and wildlife conservation as separate entities, AquaGuard brings them under one umbrella. By correlating real-time water quality with potential health risks and wildlife conservation challenges, it offers a comprehensive view of the ecosystem's state. This integrated insight is crucial for immediate, informed decision-making, providing a proactive rather than reactive solution to the challenges posed by deteriorating water conditions.

### Solution: AquaGuard
AquaGuard is an integrated AI-augmented satellite imagery system that monitors water quality in real-time, correlating this data with potential implications for both human health (like disease outbreaks) and wildlife conservation (like aquatic species distress).

### How it works:
1. users draw a polygon around a map (satellite imagery) to take a picture
OR users take a pic
2. we run the picture through a GPT-4 to analyze water quality
3. we get results back with metrics, we will focus on water metrics from WHO (world health org), CDC (center for disease), 
4. we rank the water area on a scale of 10, and also write down what the results were from the metrics
5. we equip individuals with the resources they need to safeguard their water sources effectively. From EPA registered algaecides to local vegetation planting initiatives and tools to report illegal dumping, we empower communities to take tangible action. 

## Macro water metrics that can be inferred from satellite images 
1. Turbidity: Turbidity, or the cloudiness of water due to suspended particles, can be estimated using satellite imagery. High turbidity can indicate potential contaminants or pathogens in the water.

2. Algal Blooms: The presence of harmful algal blooms, which may produce toxins detrimental to human health, can be identified using specific spectral bands from satellite imagery.

3. Land Use and Deforestation: Satellite imagery can show changes in land use around a water body. Deforestation, urbanization, or agricultural expansion can influence water quality.

4. Color: The color of a water body can provide clues about its composition. For example, a reddish or brownish hue might indicate a high concentration of iron or tannins.
   
## Users
- users in remote areas in developed countries or people in non-developed countries where water quality is not as measured

## next steps: 
- add wildlife data 
- add natural distaster event data
- train a specific model for water quality analysis based on satellite or camera imagery.
- provide localized resources
- Ensure that the location data, especially from individual users, is anonymized and secure. Users might be hesitant to use the app if they feel their data could be misused.


# Mini pitch for gov
### AquaGuard for Government Agencies
Water is life, but how well do we truly know our water bodies?
- In today's dynamic world, where environmental changes are the new norm, having real-time, comprehensive data on our water bodies isn't a luxury; it's a necessity. Yet, the harsh reality is that a significant number of our smaller water bodies go unmonitored, leaving communities vulnerable and ecosystems at risk.

Enter AquaGuard.

Why AquaGuard?

1. Comprehensive Monitoring: From the largest lake to the smallest pond, get data on all water bodies, ensuring no community is left uninformed and no ecosystem is overlooked.
2. Cost-Effective & Efficient: Traditional water quality assessments can be resource-intensive. With AquaGuard's AI-driven system, cut down on costs while boosting monitoring frequency.
3. Proactive Approach: Be alerted to potential issues, from algal blooms to contamination, before they become large-scale crises. Respond faster, plan smarter.

### Why this is important
- Scale of Untracked Water Bodies: Many large lakes, rivers, and reservoirs are often monitored due to their significance. It's the smaller, decentralized water bodies that often fall through the cracks. These water bodies can still have significant local importance, serving communities, supporting ecosystems, or acting as potential indicators for larger regional environmental trends.

- Emerging Concerns: With the advent of climate change, many regions are witnessing new phenomena like algal blooms in areas where they were previously rare. A tool like AquaGuard would be invaluable in providing real-time updates in such rapidly changing scenarios.

- Cost & Resource Allocation: Traditional water monitoring often requires field visits, laboratory tests, and can be resource-intensive. An AI-driven, satellite imagery-based system can drastically reduce costs and increase monitoring frequency, making it attractive to government bodies.
